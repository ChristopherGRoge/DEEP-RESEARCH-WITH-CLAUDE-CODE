#!/bin/bash
set -e

# ============================================
# Deep Research - Setup
# ============================================
# SQLite database - zero configuration required
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
# Step 2: Setup environment
# ============================================
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        print_step "Creating .env from .env.example..."
        cp .env.example .env
    else
        print_step "Creating default .env..."
        echo 'DATABASE_URL="file:./research.db"' > .env
    fi
else
    print_step ".env already exists, skipping."
fi

# ============================================
# Step 3: Install npm dependencies
# ============================================
print_step "Installing npm dependencies..."
npm install

# ============================================
# Step 4: Generate Prisma client
# ============================================
print_step "Generating Prisma client..."
npx prisma generate

# ============================================
# Step 5: Setup SQLite database
# ============================================
print_step "Setting up SQLite database..."

DB_PATH="research.db"
if [ -f "$DB_PATH" ]; then
    print_step "Database already exists at $DB_PATH"
    print_step "Running pending migrations..."
else
    print_step "Creating new database at $DB_PATH..."
fi

npx prisma migrate deploy

# ============================================
# Step 6: Install git hooks (optional)
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
echo "Database: $DB_PATH (SQLite)"
echo ""
echo "To start Grove:"
echo "  npm run server                  # http://localhost:3000"
echo ""
echo "Other commands:"
echo "  npm run cli -- project:list     # List projects"
echo "  npm run db:studio               # Visual database browser"
echo ""
