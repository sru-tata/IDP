##idp/routes.py
"""
REST API for the IDP Learning Intelligence Platform domain. This is what
the React frontend's service layer (learning.service.js, user.service.js,
competency.service.js, role.service.js, hr.service.js,
leaderboard.service.js) calls - each of those services falls back to
local mock data automatically if this API is unreachable, so the
frontend keeps working even without a live backend.

Mounted under the "/idp" prefix in app.py.
"""
import logging
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from idp.db import get_collection, is_connected

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/idp", tags=["IDP Platform"])

DEMO_USER_ID = "EMP001"


def strip_id(document: Optional[dict]) -> Optional[dict]:
    """Mongo's ObjectId isn't JSON serializable - drop it from responses."""

    if document is None:
        return None

    document.pop("_id", None)
    return document


def strip_ids(documents: List[dict]) -> List[dict]:

    return [strip_id(doc) for doc in documents]


def require_db(collection_name: str):

    collection = get_collection(collection_name)

    if collection is None:
        raise HTTPException(
            status_code=503,
            detail=(
                "IDP database is unavailable right now. The frontend will "
                "automatically fall back to local demo data."
            ),
        )

    return collection


@router.get("/health")
def idp_health():

    return {"connected": is_connected()}


# --------------------------------------------------------------------
# Auth (frontend-only demo auth backed by a real endpoint, no password
# store yet - see README for scope notes)
# --------------------------------------------------------------------

class LoginRequest(BaseModel):
    role: str
    name: Optional[str] = None


@router.post("/auth/login")
def login(payload: LoginRequest):

    if payload.role not in ("candidate", "hr"):
        raise HTTPException(status_code=400, detail="role must be 'candidate' or 'hr'")

    return {
        "role": payload.role,
        "name": (payload.name or "").strip() or ("HR Admin" if payload.role == "hr" else "Candidate"),
        "token": uuid.uuid4().hex,
        "loggedInAt": datetime.now(timezone.utc).isoformat(),
    }


# --------------------------------------------------------------------
# Courses
# --------------------------------------------------------------------

@router.get("/courses")
def list_courses():

    collection = require_db("courses")

    return strip_ids(list(collection.find({})))


class CourseProgressUpdate(BaseModel):
    progress: Optional[int] = None
    started: Optional[bool] = None
    recommended: Optional[bool] = None
    completedAt: Optional[str] = None


@router.patch("/courses/{course_id}")
def update_course(course_id: int, payload: CourseProgressUpdate):

    collection = require_db("courses")

    updates = {k: v for k, v in payload.model_dump().items() if v is not None}

    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update.")

    result = collection.find_one_and_update(
        {"id": course_id},
        {"$set": updates},
        return_document=True,
    )

    if not result:
        raise HTTPException(status_code=404, detail="Course not found.")

    return strip_id(result)


# --------------------------------------------------------------------
# Competencies
# --------------------------------------------------------------------

@router.get("/competencies")
def list_competencies():

    collection = require_db("competencies")

    return strip_ids(list(collection.find({})))


# --------------------------------------------------------------------
# Career Roles + Skill Trees
# --------------------------------------------------------------------

@router.get("/roles")
def list_roles():

    collection = require_db("career_roles")

    return strip_ids(list(collection.find({})))


@router.get("/roles/{role_id}/skill-tree")
def get_skill_tree(role_id: str):

    collection = require_db("skill_trees")

    tree = collection.find_one({"id": role_id})

    if not tree:
        raise HTTPException(status_code=404, detail="Skill tree not found for this role.")

    return strip_id(tree)


@router.patch("/roles/{role_id}/skill-tree/nodes/{node_id}/complete")
def complete_skill_node(role_id: str, node_id: str):

    collection = require_db("skill_trees")

    tree = collection.find_one({"id": role_id})

    if not tree:
        raise HTTPException(status_code=404, detail="Skill tree not found for this role.")

    nodes = tree.get("nodes", [])
    target = next((n for n in nodes if n["id"] == node_id), None)

    if not target:
        raise HTTPException(status_code=404, detail="Skill node not found.")

    completed_ids = {n["id"] for n in nodes if n.get("completed")} | {node_id}

    for node in nodes:
        if node["id"] == node_id:
            node["completed"] = True
        prereqs = node.get("prerequisites") or []
        node["unlocked"] = node.get("completed") or not prereqs or all(p in completed_ids for p in prereqs)

    collection.update_one({"id": role_id}, {"$set": {"nodes": nodes}})

    return strip_id(collection.find_one({"id": role_id}))


# --------------------------------------------------------------------
# Users (single demo user - EMP001)
# --------------------------------------------------------------------

@router.get("/users/me")
def get_current_user():

    collection = require_db("users")

    user = collection.find_one({"id": DEMO_USER_ID})

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found - run the seed script.")

    return strip_id(user)


class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    targetRoleId: Optional[str] = None
    interests: Optional[List[str]] = None
    preferredLearningFormat: Optional[str] = None
    preferredLearningTime: Optional[str] = None
    weeklyGoal: Optional[int] = None


@router.patch("/users/me")
def update_current_user(payload: UserUpdate):

    collection = require_db("users")

    updates = {k: v for k, v in payload.model_dump().items() if v is not None}

    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update.")

    user = collection.find_one_and_update(
        {"id": DEMO_USER_ID},
        {"$set": updates},
        return_document=True,
    )

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found.")

    return strip_id(user)


class XPUpdate(BaseModel):
    amount: int


@router.post("/users/me/xp")
def add_xp(payload: XPUpdate):

    collection = require_db("users")

    user = collection.find_one({"id": DEMO_USER_ID})

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found.")

    xp = user["xp"] + payload.amount
    level = user["currentLevel"]
    xp_to_next = user["xpToNextLevel"]

    while xp >= xp_to_next:
        xp -= xp_to_next
        level += 1
        xp_to_next = round(xp_to_next * 1.15)

    updates = {"xp": xp, "currentLevel": level, "xpToNextLevel": xp_to_next}

    collection.update_one({"id": DEMO_USER_ID}, {"$set": updates})

    return strip_id(collection.find_one({"id": DEMO_USER_ID}))


class ActivityEntry(BaseModel):
    type: str
    title: str
    xp: int = 0
    date: Optional[str] = None


@router.post("/users/me/activity")
def add_activity(payload: ActivityEntry):

    collection = require_db("users")

    entry = payload.model_dump()
    entry["date"] = entry["date"] or datetime.now(timezone.utc).date().isoformat()

    user = collection.find_one_and_update(
        {"id": DEMO_USER_ID},
        {"$push": {"activities": {"$each": [entry], "$position": 0}}},
        return_document=True,
    )

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found.")

    return strip_id(user)


class LearningPlanToggle(BaseModel):
    courseId: int


@router.patch("/users/me/learning-plan")
def toggle_learning_plan(payload: LearningPlanToggle):

    collection = require_db("users")

    user = collection.find_one({"id": DEMO_USER_ID})

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found.")

    plan: List[int] = user.get("learningPlan", [])

    if payload.courseId in plan:
        plan.remove(payload.courseId)
    else:
        plan.append(payload.courseId)

    collection.update_one({"id": DEMO_USER_ID}, {"$set": {"learningPlan": plan}})

    return {"learningPlan": plan}


# --------------------------------------------------------------------
# HR Analytics
# --------------------------------------------------------------------

@router.get("/hr/departments")
def get_hr_departments():

    collection = require_db("hr_departments")

    return strip_ids(list(collection.find({})))


@router.get("/hr/competency-overview")
def get_hr_competency_overview():

    collection = require_db("hr_competency_overview")

    doc = collection.find_one({"_key": "current"})

    if not doc:
        raise HTTPException(status_code=404, detail="HR competency overview not seeded yet.")

    return doc.get("rows", [])


@router.get("/hr/employees")
def get_hr_employees():

    collection = require_db("hr_employees")

    return strip_ids(list(collection.find({})))


@router.get("/hr/insights")
def get_hr_insights():

    collection = require_db("hr_insights")

    return strip_ids(list(collection.find({})))


@router.get("/hr/trends")
def get_hr_trends():

    collection = require_db("hr_trends")

    doc = collection.find_one({"_key": "current"})

    if not doc:
        raise HTTPException(status_code=404, detail="HR trends not seeded yet.")

    return {
        "readinessTrend": doc.get("readinessTrend", []),
        "departmentChallenges": doc.get("departmentChallenges", []),
    }


# --------------------------------------------------------------------
# Leaderboard
# --------------------------------------------------------------------

@router.get("/leaderboard")
def get_leaderboard():

    collection = require_db("leaderboard")
    users_collection = require_db("users")

    peers = strip_ids(list(collection.find({})))
    user = users_collection.find_one({"id": DEMO_USER_ID})

    entries: List[Dict[str, Any]] = list(peers)

    if user:
        entries.append({
            "id": "you",
            "name": "You",
            "department": user.get("department"),
            "xp": user.get("xp", 0),
            "trend": "same",
        })

    entries.sort(key=lambda entry: entry["xp"], reverse=True)

    for index, entry in enumerate(entries):
        entry["rank"] = index + 1

    return entries
