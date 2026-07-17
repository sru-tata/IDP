##idp/seed.py
"""
Populates the IDP Mongo collections with the platform's starter dataset
(45 real-YouTube-backed courses, 5 competencies, 5 career roles + skill
trees, the demo user, and the HR analytics dataset - departments, team
competency overview, employee roster, AI insights, trends, leaderboard).

This is the single source of truth the React frontend's mock data was
originally ported from, so the two stay in lockstep.

Usage (from backend/DemoApp):

    python -m idp.seed            # seed if collections are empty
    python -m idp.seed --reset    # wipe + reseed every IDP collection
"""
import argparse
import json
import logging
from pathlib import Path

from idp.db import get_collection, is_connected, COLLECTIONS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SEED_DIR = Path(__file__).parent / "seed_data"


def load_json(filename: str):

    with open(SEED_DIR / filename) as f:
        return json.load(f)


def seed_collection(name: str, documents: list, reset: bool):

    collection = get_collection(name)

    if collection is None:
        logger.error("Skipping '%s' - no MongoDB connection.", name)
        return

    if reset:
        collection.delete_many({})

    if collection.count_documents({}) > 0 and not reset:
        logger.info("'%s' already has data (%d docs) - skipping. Use --reset to reseed.",
                     COLLECTIONS[name], collection.count_documents({}))
        return

    if documents:
        collection.insert_many(documents)

    logger.info("Seeded '%s' with %d documents.", COLLECTIONS[name], len(documents))


def run(reset: bool = False):

    if not is_connected():
        logger.critical(
            "Cannot seed - no MongoDB connection. Check settings.py "
            "(mongo_username/mongo_password/MONGO_HOST) and network access "
            "to the NeuroNest Mongo cluster."
        )
        return False

    courses = load_json("courses.json")
    competencies = load_json("competencies.json")
    career_roles = load_json("career_roles.json")

    skill_trees_raw = load_json("skill_trees.json")
    skill_trees = list(skill_trees_raw.values())

    user = load_json("user.json")

    hr_departments = load_json("hr_departments.json")
    hr_competency_overview = load_json("hr_competency_overview.json")
    hr_employees = load_json("hr_employees.json")
    hr_insights = load_json("hr_insights.json")
    hr_trends = load_json("hr_trends.json")
    leaderboard = load_json("leaderboard.json")

    seed_collection("courses", courses, reset)
    seed_collection("competencies", competencies, reset)
    seed_collection("career_roles", career_roles, reset)
    seed_collection("skill_trees", skill_trees, reset)
    seed_collection("users", [user], reset)
    seed_collection("hr_departments", hr_departments, reset)
    seed_collection("hr_employees", hr_employees, reset)
    seed_collection("hr_insights", hr_insights, reset)
    seed_collection("leaderboard", leaderboard, reset)

    # Single-document collections (overview table + trends) - store as one
    # document each rather than many, since they're read as a whole.
    overview_collection = get_collection("hr_competency_overview")
    if overview_collection is not None:
        if reset:
            overview_collection.delete_many({})
        if overview_collection.count_documents({}) == 0 or reset:
            overview_collection.insert_one({"_key": "current", "rows": hr_competency_overview})
            logger.info("Seeded 'idp_hr_competency_overview'.")

    trends_collection = get_collection("hr_trends")
    if trends_collection is not None:
        if reset:
            trends_collection.delete_many({})
        if trends_collection.count_documents({}) == 0 or reset:
            trends_collection.insert_one({"_key": "current", **hr_trends})
            logger.info("Seeded 'idp_hr_trends'.")

    logger.info("IDP seed complete.")
    return True


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Wipe and reseed every IDP collection")
    args = parser.parse_args()

    run(reset=args.reset)
