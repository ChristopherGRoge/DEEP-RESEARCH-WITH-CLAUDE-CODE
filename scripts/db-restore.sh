#!/bin/bash
set -e

# SQLite Restore Script
# Replaces the database file from a backup

DB_PATH="prisma/research.db"

if [ -z "$1" ]; then
    echo "Usage: $0 <backup-file.db.gz>"
    echo ""
    echo "Available backups:"
    ls -la backups/*.db.gz 2>/dev/null || echo "  No backups found"
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

# Create a safety backup of current database
if [ -f "$DB_PATH" ]; then
    SAFETY_BACKUP="backups/pre-restore-$(date +%Y%m%d-%H%M%S).db"
    echo "Creating safety backup: $SAFETY_BACKUP"
    cp "$DB_PATH" "$SAFETY_BACKUP"
fi

echo "Restoring from backup..."
gunzip -c "$BACKUP_FILE" > "$DB_PATH"

echo "Restored from: $BACKUP_FILE"
