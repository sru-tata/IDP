##idp/db.py
"""
Mongo connection for the IDP platform domain (courses, competencies,
skill trees, HR analytics, leaderboard, users) - kept separate from
db_manager.py, which owns the chat/thread collections used by the
existing conversational template. Same cluster, same credentials
(settings.py), different collections.
"""
import logging

from pymongo import MongoClient, ASCENDING

from settings import settings

logger = logging.getLogger(__name__)

MONGO_URI = settings.MONGO_URI
DB_NAME = settings.DB_NAME

COLLECTIONS = {
    "courses": "idp_courses",
    "competencies": "idp_competencies",
    "career_roles": "idp_career_roles",
    "skill_trees": "idp_skill_trees",
    "users": "idp_users",
    "hr_departments": "idp_hr_departments",
    "hr_competency_overview": "idp_hr_competency_overview",
    "hr_employees": "idp_hr_employees",
    "hr_insights": "idp_hr_insights",
    "hr_trends": "idp_hr_trends",
    "leaderboard": "idp_leaderboard",
}

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command("ismaster")
    db = client[DB_NAME]

    db[COLLECTIONS["courses"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["competencies"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["career_roles"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["skill_trees"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["users"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["hr_departments"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["hr_employees"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["hr_insights"]].create_index([("id", ASCENDING)], unique=True)
    db[COLLECTIONS["leaderboard"]].create_index([("id", ASCENDING)], unique=True)

    logger.info("IDP domain: connected to MongoDB '%s' at %s.", DB_NAME, settings.MONGO_HOST)

except Exception as exc:
    logger.critical("IDP domain: failed to connect to MongoDB: %s", exc, exc_info=True)
    client = None
    db = None


def get_collection(name: str):
    """Returns the Mongo collection for a logical IDP collection name, or
    None if the database isn't reachable (callers must handle this and
    degrade gracefully, same pattern as db_manager.py)."""

    if db is None:
        return None

    return db[COLLECTIONS[name]]


def is_connected() -> bool:

    return db is not None
