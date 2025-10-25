#!/bin/bash

# Cleanup script for micro-k8s deployment
# This script removes the portfolio application from micro-k8s

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

NAMESPACE="${NAMESPACE:-default}"

echo "======================================"
echo "Portfolio Application Cleanup"
echo "======================================"
echo ""
echo "This will delete the application from namespace: $NAMESPACE"
echo ""

# Ask for confirmation
read -p "Are you sure you want to delete the deployment? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled"
    exit 0
fi

# Check if microk8s is installed
if ! command -v microk8s &> /dev/null; then
    echo -e "${RED}Error: microk8s is not installed${NC}"
    exit 1
fi

# Delete Kubernetes resources
echo -e "${YELLOW}Deleting Kubernetes resources...${NC}"
microk8s kubectl delete -k k8s/ -n $NAMESPACE --ignore-not-found=true

echo ""
echo -e "${GREEN}Cleanup completed!${NC}"
echo ""
echo "All resources have been deleted from namespace: $NAMESPACE"
