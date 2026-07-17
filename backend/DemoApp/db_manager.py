##db_manager.py (Revised)
import logging
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
import pytz
import uuid
import os
from pathlib import Path
from settings import settings

# --- MongoDB Configuration ---

MONGO_URI = settings.MONGO_URI
DB_NAME = settings.DB_NAME
COLLECTION_NAME = settings.MONGO_COLLECTION_NAME

logger = logging.getLogger(__name__)
ist_timezone = pytz.timezone('Asia/Kolkata')

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command('ismaster')
    db = client[DB_NAME]
    threads_collection = db[COLLECTION_NAME]

    for coll in [threads_collection]:
        coll.create_index([("user_id", 1), ("updated_at", DESCENDING)])
    logger.info("Successfully connected to MongoDB and set up all four collections.")

except Exception as e:
    logger.critical(f"Failed to connect to MongoDB: {e}", exc_info=True)
    client = None
    threads_collection = None

COLLECTIONS_MAP = {COLLECTION_NAME: threads_collection}

def get_current_ist_datetime() -> datetime:
    """Returns the current IST time as a datetime object."""
    return datetime.now(ist_timezone)

# Helper function to parse the IST string format back to datetime if needed
def parse_ist_str_to_datetime(ist_str: str) -> Optional[datetime]:
    try:
        # Match the format used for storing: '%Y/%m/%d %I:%M:%S %p'
        return datetime.strptime(ist_str, '%Y/%m/%d %I:%M:%S %p').replace(tzinfo=ist_timezone)
    except (ValueError, TypeError):
        return None

def format_timestamp_to_ist_str(timestamp_input: Optional[Any]) -> Optional[str]:
    if timestamp_input is None:
        return None

    # If the input is already a string that looks like our target format, return it directly.
    # This handles cases where data is read from DB and passed back into this function.
    if isinstance(timestamp_input, str):
        # A simple check to see if it approximately matches the format, to avoid re-formatting already formatted strings
        if ' AM' in timestamp_input or ' PM' in timestamp_input:
            return timestamp_input
        # If it's a string but NOT in the expected display format (e.g., an ISO string from an external source),
        # then try to parse and format it.
        try:
            dt = datetime.fromisoformat(timestamp_input.replace('Z', '+00:00'))
            if dt.tzinfo is None:
                dt = pytz.utc.localize(dt) # Assume UTC if naive string
            return dt.astimezone(ist_timezone).strftime('%Y/%m/%d %I:%M:%S %p')
        except (ValueError, TypeError):
            # If it's a string but not parsable as ISO or already formatted, return it as is or log a warning.
            logger.warning(f"Unexpected string format for timestamp: '{timestamp_input}'. Returning as is.")
            return timestamp_input

    # If the input is a datetime object, format it.
    elif isinstance(timestamp_input, datetime):
        dt = timestamp_input
        # Ensure the datetime object is timezone-aware before converting to IST.
        # If it's naive, assume it's meant to be in IST if coming from get_current_ist_datetime(),
        # or localize it if it could be from other sources and potentially UTC.
        # For simplicity, if get_current_ist_datetime() is the primary source of datetime objects here,
        # it will already be IST-aware.
        if dt.tzinfo is None:
             # If a naive datetime is passed, we must localize it.
             # This assumes that if it's a naive datetime, it's implicitly UTC,
             # which is a common convention for raw datetimes before localization.
             dt = pytz.utc.localize(dt) # Or another timezone if known contextually

        return dt.astimezone(ist_timezone).strftime('%Y/%m/%d %I:%M:%S %p')
    else:
        logger.warning(f"Unsupported timestamp type: {type(timestamp_input)}. Returning original value.")
        return str(timestamp_input) # Fallback for other types

# Rest of db_manager.py remains the same:

def get_user_thread_list(user_id: str, collection_name: str) -> List[Dict[str, Any]]:
    target_collection = COLLECTIONS_MAP.get(collection_name)

    if target_collection is None: return []

    try:
        sort_key = "updated_at"
        query_filter = {
            "user_id": user_id,
            "chat_deleted": {"$ne": True}
        }
        projection = {"id": 1,
                      "title": 1,
                      "updated_at": 1,
                      "_id": 0
                    }
        cursor = target_collection.find(query_filter, projection).sort(sort_key, DESCENDING)

        thread_list = []

        for thread in cursor:
            # Here, thread.pop('updated_at') will return a string like '2025/12/29 11:07:55 AM'
            # format_timestamp_to_ist_str should now handle this by returning it directly
            if 'updated_at' in thread:
                thread['last_updated'] = format_timestamp_to_ist_str(thread.pop('updated_at'))
            thread_list.append(thread)

        return thread_list

    except Exception as e:
        logger.error(f"Error fetching thread list for user {user_id} from {collection_name}: {e}", exc_info=True)
        return []

def get_thread_by_id(thread_id: str, user_id: str, collection_name: str) -> Optional[Dict[str, Any]]:
    target_collection = COLLECTIONS_MAP.get(collection_name)

    if target_collection is None: return None

    try:
        db_document = target_collection.find_one({"id": thread_id, "user_id": user_id})

        if not db_document:
            return None

        if collection_name == COLLECTION_NAME:
            return _transform_db_to_runtime_schema(db_document)

        else:
             logger.warning(f"No DB-to-Runtime transformer for '{collection_name}'. Returning raw.")
             return db_document

    except Exception as e:
        logger.error(f"Error fetching thread {thread_id} for user {user_id} from {collection_name}: {e}", exc_info=True)
        return None

def mark_thread_as_deleted(thread_id: str, collection_name: str):
    """
    Marks a thread as deleted by setting the 'chat_deleted' flag to True.
    """
    target_collection = COLLECTIONS_MAP.get(collection_name)

    if target_collection is None:
        logger.error(f"Cannot mark thread as deleted, collection '{collection_name}' not found.")
        return

    try:
        now_ist_dt = get_current_ist_datetime()
        update_payload = {
            '$set': {
                'chat_deleted': True,
                'updated_at': format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
            }
        }
        result = target_collection.update_one({'id': thread_id}, update_payload)

        if result.modified_count > 0:
            logger.info(f"Successfully marked thread {thread_id} in '{collection_name}' as deleted.")

        else:
            logger.warning(f"Thread {thread_id} not found in '{collection_name}' to mark as deleted.")

    except Exception as e:
        logger.error(f"Error marking thread {thread_id} as deleted: {e}", exc_info=True)

def rename_thread_title(thread_id: str, collection_name: str, new_title: str):
    """
    Renames the title of a specific thread.
    """
    target_collection = COLLECTIONS_MAP.get(collection_name)

    if target_collection is None:
        logger.error(f"Cannot rename thread, collection '{collection_name}' not found.")
        return

    try:
        now_ist_dt = get_current_ist_datetime()
        update_payload = {
            '$set': {
                'title': new_title,
                'updated_at': format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
            }
        }
        result = target_collection.update_one({'id': thread_id}, update_payload)

        if result.modified_count > 0:
            logger.info(f"Successfully renamed thread {thread_id} to '{new_title}' in '{collection_name}'.")

        else:
            logger.warning(f"Thread {thread_id} not found in '{collection_name}' to rename.")

    except Exception as e:
        logger.error(f"Error renaming thread {thread_id}: {e}", exc_info=True)

def _transform_db_to_runtime_schema(db_document: Dict[str, Any]) -> Dict[str, Any]:
    flat_general_messages = []
    for turn in db_document.get("messages", []):
        # These will be strings from the DB, format_timestamp_to_ist_str should return them directly
        user_timestamp_formatted = format_timestamp_to_ist_str(turn.get("user_timestamp"))
        assistant_timestamp_formatted = format_timestamp_to_ist_str(turn.get("assistant_timestamp"))

        if turn.get("user_query"):
            flat_general_messages.append({
                "role": "user",
                "content": turn.get("user_query"),
                "client_message_id": turn.get("user_client_id"),
                "backend_message_id": turn.get("user_backend_id"),
                "timestamp": user_timestamp_formatted
            })
        if turn.get("assistant_response"):
            flat_general_messages.append({
                "role": "assistant",
                "content": turn.get("assistant_response"),
                "client_message_id": turn.get("assistant_client_id"),
                "backend_message_id": turn.get("assistant_backend_id"),
                "feedback": turn.get("feedback"),
                "timestamp": assistant_timestamp_formatted
            })
    last_updated_ist_str = format_timestamp_to_ist_str(db_document.get("updated_at")) # This will be a string from DB

    return {
        "id": db_document.get("id"),
        "title": db_document.get("title"),
        "last_updated": last_updated_ist_str,
        "messages": flat_general_messages,
        "title_generated": db_document.get("title_generated", False),
    }

def create_thread_in_db(thread_data: Dict[str, Any], collection_name: str):
    target_collection = COLLECTIONS_MAP.get(collection_name)
    if target_collection is None: return
    try:
        now_ist_dt = get_current_ist_datetime()

        thread_data["created_at"] = format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
        thread_data["last_updated"] = format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
        thread_data["updated_at"] = format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object

        target_collection.insert_one(thread_data)
        logger.info(f"Created thread {thread_data.get('id')} in '{collection_name}'.")
    except Exception as e:
        logger.error(f"Error creating thread {thread_data.get('id')}: {e}", exc_info=True)

def update_thread_field(thread_id: str, collection_name: str, field_updates: Dict[str, Any]):
    target_collection = COLLECTIONS_MAP.get(collection_name)
    if target_collection is None: return
    try:
        field_updates['updated_at'] = format_timestamp_to_ist_str(get_current_ist_datetime()) # now_ist_dt is a datetime object
        target_collection.update_one({'id': thread_id}, {'$set': field_updates})
    except Exception as e:
        logger.error(f"Error updating fields for thread {thread_id}: {e}", exc_info=True)

def add_turn_to_chat(thread_id: str, collection_name: str, turn_data: Dict):
    target_collection = COLLECTIONS_MAP.get(collection_name)
    if target_collection is None: return
    try:
        now_ist_dt = get_current_ist_datetime()
        turn_data["user_timestamp"] = format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
        turn_data["assistant_timestamp"] = format_timestamp_to_ist_str(now_ist_dt) # now_ist_dt is a datetime object
        update_payload = {'$push': {'messages': turn_data}, '$set': {'updated_at': format_timestamp_to_ist_str(now_ist_dt)}}
        target_collection.update_one({'id': thread_id}, update_payload)
    except Exception as e:
        logger.error(f"Error adding turn to general chat for thread {thread_id}: {e}", exc_info=True)

def update_feedback_in_chat(thread_id: str, collection_name: str, message_id: str, feedback: Optional[str]):
    target_collection = COLLECTIONS_MAP.get(collection_name)
    if target_collection is None:
        logger.error(f"Cannot update feedback, collection '{collection_name}' not found.")
        return
    try:
        query = {"id": thread_id}
        update = {"$set": {"messages.$[turn].feedback": feedback}}
        array_filters = [
            {
                "turn.assistant_backend_id": message_id
            }
        ]

        result = target_collection.update_one(query, update, array_filters=array_filters)

        if result.matched_count == 0:
            logger.debug(f"Could not find message by backend_id {message_id}, trying client_id.")
            array_filters_client = [{"turn.assistant_client_id": message_id}]
            target_collection.update_one(query, update, array_filters=array_filters_client)

    except Exception as e:
        logger.error(f"Error updating feedback in general chat for message {message_id}: {e}", exc_info=True)