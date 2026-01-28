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

# Function to handle SSL certificate errors
handle_ssl_error() {
    echo ""
    print_error "SSL certificate error detected."
    echo ""
    echo "This often happens on corporate networks with SSL inspection."
    echo ""
    echo "Workarounds:"
    echo ""
    echo "  Option 1: Disable SSL verification (use with caution)"
    echo "    NODE_TLS_REJECT_UNAUTHORIZED=0 ./install.sh"
    echo ""
    echo "  Option 2: Set corporate CA certificate"
    echo "    export NODE_EXTRA_CA_CERTS=/path/to/corporate-ca.pem"
    echo "    ./install.sh"
    echo ""
    echo "  Option 3: If behind a proxy"
    echo "    export HTTPS_PROXY=http://your-proxy:port"
    echo "    ./install.sh"
    echo ""
    exit 1
}

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
fi

# ============================================
# Step 3: Install npm dependencies
# ============================================
print_step "Installing npm dependencies..."
npm install

# ============================================
# Step 4: Setup database
# ============================================
print_step "Setting up SQLite database..."

# Check if database exists
DB_PATH="research.db"
if [ -f "$DB_PATH" ]; then
    print_step "Database already exists at $DB_PATH"
    print_step "Running database migrations..."
else
    print_step "Creating new database..."
fi

# Run migrations - capture output to detect SSL errors
MIGRATE_OUTPUT=$(npx prisma migrate deploy 2>&1) || {
    echo "$MIGRATE_OUTPUT"
    if echo "$MIGRATE_OUTPUT" | grep -q "unable to get local issuer certificate\|UNABLE_TO_GET_ISSUER_CERT"; then
        handle_ssl_error
    fi
    exit 1
}
echo "$MIGRATE_OUTPUT"

# Generate Prisma client
print_step "Generating Prisma client..."
GENERATE_OUTPUT=$(npx prisma generate 2>&1) || {
    echo "$GENERATE_OUTPUT"
    if echo "$GENERATE_OUTPUT" | grep -q "unable to get local issuer certificate\|UNABLE_TO_GET_ISSUER_CERT"; then
        handle_ssl_error
    fi
    exit 1
}
echo "$GENERATE_OUTPUT"

# ============================================
# Step 5: Install frontend dependencies
# ============================================
if [ -d "frontend" ]; then
    print_step "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

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
echo "Database: research.db (SQLite)"
echo ""
echo "To start the application:"
echo "  npm run dev                     # Start backend + frontend"
echo ""
echo "Or run separately:"
echo "  npm run server                  # Backend API only (port 3001)"
echo "  npm run frontend:dev            # Frontend only (port 5173)"
echo ""
echo "Other commands:"
echo "  npm run cli -- project:list    # List projects"
echo "  npm run db:studio              # Open visual database browser"
echo ""
