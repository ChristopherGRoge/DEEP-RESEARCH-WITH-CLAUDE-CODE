#!/bin/bash
set -e

# Configuration
DB_NAME="deep_research"
DB_USER="researcher"
DB_PASS="research_dev_2024"
DB_PORT="5433"
DB_HOST="localhost"

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup-$TIMESTAMP.sql.gz"
KEEP_COUNT=5

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Create backup using local pg_dump
PGPASSWORD=$DB_PASS pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME | gzip > "$BACKUP_FILE"

# Validate backup is non-empty
if [ ! -s "$BACKUP_FILE" ]; then
    echo "ERROR: Backup file is empty"
    rm -f "$BACKUP_FILE"
    exit 1
fi

echo "Backup created: $BACKUP_FILE"

# Retention: keep only last N backups
cd "$BACKUP_DIR"
ls -t backup-*.sql.gz 2>/dev/null | tail -n +$((KEEP_COUNT + 1)) | xargs -r rm -f
echo "Kept last $KEEP_COUNT backups"
