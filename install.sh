#!/bin/bash
set -e

# ============================================
# Deep Research - Local PostgreSQL Setup
# ============================================
# Prerequisites: PostgreSQL 14+ installed locally
# Run: ./install.sh
# ============================================

# Configuration (matches .env)
DB_NAME="deep_research"
DB_USER="researcher"
DB_PASS="research_dev_2024"
DB_PORT="5433"
DB_HOST="localhost"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() { echo -e "${GREEN}==>${NC} $1"; }
print_warn() { echo -e "${YELLOW}WARNING:${NC} $1"; }
print_error() { echo -e "${RED}ERROR:${NC} $1"; }

# ============================================
# Step 1: Check Prerequisites
# ============================================
print_step "Checking prerequisites..."

# Check for psql
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL client (psql) not found."
    echo ""
    echo "Please install PostgreSQL first:"
    echo ""
    echo "  macOS (Homebrew):"
    echo "    brew install postgresql@16"
    echo "    brew services start postgresql@16"
    echo ""
    echo "  Ubuntu/Debian:"
    echo "    sudo apt update && sudo apt install postgresql postgresql-contrib"
    echo "    sudo systemctl start postgresql"
    echo ""
    echo "  RHEL/Fedora:"
    echo "    sudo dnf install postgresql-server postgresql-contrib"
    echo "    sudo postgresql-setup --initdb"
    echo "    sudo systemctl start postgresql"
    echo ""
    echo "After installing, configure PostgreSQL to use port $DB_PORT:"
    echo "  Edit postgresql.conf and set: port = $DB_PORT"
    echo "  Then restart PostgreSQL"
    echo ""
    exit 1
fi

# Check PostgreSQL version
PG_VERSION=$(psql --version | grep -oE '[0-9]+' | head -1)
if [ "$PG_VERSION" -lt 14 ]; then
    print_warn "PostgreSQL $PG_VERSION detected. Version 14+ recommended."
fi

print_step "PostgreSQL $(psql --version | head -1) found."

# ============================================
# Step 2: Check if PostgreSQL is running on target port
# ============================================
print_step "Checking PostgreSQL availability on port $DB_PORT..."

if ! pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
    print_error "No PostgreSQL server found on $DB_HOST:$DB_PORT"
    echo ""
    echo "Options:"
    echo ""
    echo "  1. Start PostgreSQL on port $DB_PORT:"
    echo "     Edit postgresql.conf to set port = $DB_PORT"
    echo "     Then restart PostgreSQL"
    echo ""
    echo "  2. Use a different port (requires .env update):"
    echo "     Start PostgreSQL on default port 5432"
    echo "     Update DATABASE_URL in .env to use port 5432"
    echo ""
    echo "  3. Use Docker instead:"
    echo "     npm run docker:up"
    echo ""
    exit 1
fi

print_step "PostgreSQL is running on port $DB_PORT."

# ============================================
# Step 3: Create user if not exists
# ============================================
print_step "Setting up database user '$DB_USER'..."

# Check if user exists by trying to connect
USER_EXISTS=""
if PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "SELECT 1" &> /dev/null; then
    USER_EXISTS="1"
fi

if [ "$USER_EXISTS" = "1" ]; then
    print_step "User '$DB_USER' already exists."
else
    print_step "Creating user '$DB_USER'..."

    # Try different auth methods
    CREATED=""

    # Method 1: Connect as postgres with no password (trust auth)
    if [ -z "$CREATED" ] && PGPASSWORD="" psql -h $DB_HOST -p $DB_PORT -U postgres -c "SELECT 1" &> /dev/null 2>&1; then
        PGPASSWORD="" psql -h $DB_HOST -p $DB_PORT -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS' CREATEDB;" 2>/dev/null && CREATED="1"
    fi

    # Method 2: Try peer auth via sudo (Linux)
    if [ -z "$CREATED" ] && sudo -n -u postgres psql -c "SELECT 1" &> /dev/null 2>&1; then
        sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS' CREATEDB;" 2>/dev/null && CREATED="1"
    fi

    if [ -z "$CREATED" ]; then
        print_error "Cannot connect as PostgreSQL superuser."
        echo ""
        echo "Please create the user manually:"
        echo "  sudo -u postgres createuser -P $DB_USER"
        echo "  (Enter password: $DB_PASS)"
        echo ""
        echo "Then run this script again."
        exit 1
    fi

    print_step "User '$DB_USER' created."
fi

# ============================================
# Step 4: Create database if not exists
# ============================================
print_step "Setting up database '$DB_NAME'..."

# Check if database exists
DB_EXISTS=$(PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw $DB_NAME && echo "yes" || echo "no")

if [ "$DB_EXISTS" = "yes" ]; then
    print_step "Database '$DB_NAME' already exists."
else
    print_step "Creating database '$DB_NAME'..."
    PGPASSWORD=$DB_PASS createdb -h $DB_HOST -p $DB_PORT -U $DB_USER -O $DB_USER $DB_NAME
    print_step "Database '$DB_NAME' created."
fi

# ============================================
# Step 5: Verify connection
# ============================================
print_step "Verifying database connection..."

if PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1" &> /dev/null; then
    print_step "Connection verified!"
else
    print_error "Could not connect to database."
    exit 1
fi

# ============================================
# Step 6: Install npm dependencies
# ============================================
print_step "Installing npm dependencies..."
npm install

# ============================================
# Step 7: Run Prisma migrations
# ============================================
print_step "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
print_step "Generating Prisma client..."
npx prisma generate

# ============================================
# Step 8: Optionally restore from backup
# ============================================
LATEST_BACKUP=$(ls -t backups/backup-*.sql.gz 2>/dev/null | head -1)

if [ -n "$LATEST_BACKUP" ]; then
    echo ""
    print_warn "Found backup: $LATEST_BACKUP"
    read -p "Restore from this backup? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Restoring from backup..."
        # Use the restore script but skip confirmation (we just confirmed)
        echo "Dropping existing schema..."
        PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
        echo "Restoring from backup..."
        gunzip -c "$LATEST_BACKUP" | PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
        print_step "Backup restored!"
    fi
fi

# ============================================
# Step 9: Install git hooks
# ============================================
if [ -f "scripts/hooks/pre-push" ]; then
    print_step "Installing git hooks..."
    mkdir -p .git/hooks
    cp scripts/hooks/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    print_step "Git hooks installed."
fi

# ============================================
# Done!
# ============================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deep Research setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "  npm run cli -- project:list    # List projects"
echo "  npm run db:studio              # Open visual browser"
echo ""
