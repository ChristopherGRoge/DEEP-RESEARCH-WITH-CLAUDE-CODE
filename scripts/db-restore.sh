#!/bin/bash
set -e

# Configuration
DB_NAME="deep_research"
DB_USER="researcher"
DB_PASS="research_dev_2024"
DB_PORT="5433"
DB_HOST="localhost"

if [ -z "$1" ]; then
    echo "Usage: $0 <backup-file.sql.gz>"
    echo "Available backups:"
    ls -la backups/
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: File not found: $BACKUP_FILE"
    exit 1
fi

read -p "This will REPLACE the current database. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo "Dropping existing schema..."
PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "Restoring from backup..."
gunzip -c "$BACKUP_FILE" | PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME

echo "Restored from: $BACKUP_FILE"
