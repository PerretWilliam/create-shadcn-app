#!/bin/bash

# Development Scripts for create-shadcn-app

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test the CLI locally
test_cli() {
    echo -e "${YELLOW}Testing CLI locally...${NC}"
    node index.mjs
}

# Check syntax
check_syntax() {
    echo -e "${YELLOW}Checking JavaScript syntax...${NC}"
    node --check index.mjs
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Syntax is valid${NC}"
    else
        echo -e "${RED}✗ Syntax errors found${NC}"
        exit 1
    fi
}

# Clean test directories
clean_test() {
    echo -e "${YELLOW}Cleaning test directories...${NC}"
    rm -rf my-app test-app demo-app
    echo -e "${GREEN}✓ Test directories cleaned${NC}"
}

# Simulate npm pack
pack_test() {
    echo -e "${YELLOW}Simulating npm pack...${NC}"
    npm pack --dry-run
}

# Check package files
check_files() {
    echo -e "${YELLOW}Checking package files...${NC}"
    echo -e "\nFiles to be published:"
    npm pack --dry-run 2>/dev/null | grep -E "^\s+\d+\.\d+\s+[kKmM]?[bB]?\s+" || echo "Run 'npm pack --dry-run' manually"
}

# Version bump helper
bump_version() {
    local version_type=$1
    if [ -z "$version_type" ]; then
        echo -e "${YELLOW}Usage: ./dev-scripts.sh bump [patch|minor|major]${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Bumping $version_type version...${NC}"
    npm version $version_type
    echo -e "${GREEN}✓ Version bumped${NC}"
}

# Show help
show_help() {
    echo -e "${GREEN}Development Scripts${NC}"
    echo ""
    echo "Usage: ./dev-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  test        - Test the CLI locally"
    echo "  check       - Check JavaScript syntax"
    echo "  clean       - Clean test directories"
    echo "  pack        - Simulate npm pack"
    echo "  files       - Check files to be published"
    echo "  bump [type] - Bump version (patch|minor|major)"
    echo "  help        - Show this help message"
}

# Main script
case "$1" in
    test)
        test_cli
        ;;
    check)
        check_syntax
        ;;
    clean)
        clean_test
        ;;
    pack)
        pack_test
        ;;
    files)
        check_files
        ;;
    bump)
        bump_version $2
        ;;
    help|*)
        show_help
        ;;
esac
