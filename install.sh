#!/bin/bash
set -e

# ============================================
# Deep Research - SQLite Setup
# ============================================
# Zero configuration database - just works!
# Run: ./install.sh
# ============================================

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

# Check for Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js not found."
    echo ""
    echo "Please install Node.js first:"
    echo ""
    echo "  macOS (Homebrew):"
    echo "    brew install node"
    echo ""
    echo "  Or download from: https://nodejs.org/"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version | grep -oE '[0-9]+' | head -1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warn "Node.js v$NODE_VERSION detected. Version 18+ recommended."
fi

print_step "Node.js $(node --version) found."

# ============================================
# Step 2: Install npm dependencies
# ============================================
print_step "Installing npm dependencies..."
npm install

# ============================================
# Step 3: Setup database
# ============================================
print_step "Setting up SQLite database..."

# Check if database exists
DB_PATH="prisma/research.db"
if [ -f "$DB_PATH" ]; then
    print_step "Database already exists at $DB_PATH"

    # Run migrations to ensure schema is up to date
    print_step "Running database migrations..."
    npx prisma migrate deploy
else
    print_step "Creating new database..."
    npx prisma migrate deploy
fi

# Generate Prisma client
print_step "Generating Prisma client..."
npx prisma generate

# ============================================
# Step 4: Install git hooks (optional)
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
echo "Database: prisma/research.db (SQLite)"
echo ""
echo "Next steps:"
echo "  npm run cli -- project:list    # List projects"
echo "  npm run db:studio              # Open visual browser"
echo ""
