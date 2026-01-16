#!/bin/bash
set -e

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
docker exec -i research-db psql -U researcher -d deep_research -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "Restoring from backup..."
gunzip -c "$BACKUP_FILE" | docker exec -i research-db psql -U researcher -d deep_research

echo "Restored from: $BACKUP_FILE"
