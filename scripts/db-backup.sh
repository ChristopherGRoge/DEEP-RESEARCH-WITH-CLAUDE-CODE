#!/bin/bash
set -e

# SQLite Backup Script
# Simply copies the database file

DB_PATH="prisma/research.db"
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup-$TIMESTAMP.db"
KEEP_COUNT=5

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "No database found at $DB_PATH"
    exit 0
fi

# Create backup (SQLite - just copy the file)
cp "$DB_PATH" "$BACKUP_FILE"

# Compress the backup
gzip "$BACKUP_FILE"
BACKUP_FILE="$BACKUP_FILE.gz"

# Validate backup is non-empty
if [ ! -s "$BACKUP_FILE" ]; then
    echo "ERROR: Backup file is empty"
    rm -f "$BACKUP_FILE"
    exit 1
fi

echo "Backup created: $BACKUP_FILE"

# Retention: keep only last N backups
cd "$BACKUP_DIR"
ls -t backup-*.db.gz 2>/dev/null | tail -n +$((KEEP_COUNT + 1)) | xargs -r rm -f
echo "Kept last $KEEP_COUNT backups"
