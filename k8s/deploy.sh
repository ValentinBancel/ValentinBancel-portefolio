#!/bin/bash

# Deployment script for micro-k8s
# This script helps deploy the portfolio application to micro-k8s

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="portfolio-webapp"
IMAGE_TAG="latest"
DOMAIN="${DOMAIN:-portfolio.example.com}"
NAMESPACE="${NAMESPACE:-default}"

echo "======================================"
echo "Portfolio Application Deployment"
echo "======================================"
echo ""

# Check if microk8s is installed
if ! command -v microk8s &> /dev/null; then
    echo -e "${RED}Error: microk8s is not installed${NC}"
    echo "Please install microk8s first: sudo snap install microk8s --classic"
    exit 1
fi

# Check if required addons are enabled
echo -e "${YELLOW}Checking micro-k8s addons...${NC}"
if ! microk8s status | grep -q "ingress: enabled"; then
    echo -e "${YELLOW}Warning: ingress addon is not enabled${NC}"
    echo "Enable it with: microk8s enable ingress"
fi

if ! microk8s status | grep -q "cert-manager: enabled"; then
    echo -e "${YELLOW}Warning: cert-manager addon is not enabled${NC}"
    echo "Enable it with: microk8s enable cert-manager"
fi

echo ""
echo "Configuration:"
echo "  Image: $IMAGE_NAME:$IMAGE_TAG"
echo "  Domain: $DOMAIN"
echo "  Namespace: $NAMESPACE"
echo ""

# Ask for confirmation
read -p "Do you want to proceed with deployment? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 0
fi

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
cd ..
docker build -t $IMAGE_NAME:$IMAGE_TAG .

# Import image to micro-k8s
echo -e "${YELLOW}Importing image to micro-k8s...${NC}"
docker save $IMAGE_NAME:$IMAGE_TAG > /tmp/$IMAGE_NAME.tar
microk8s ctr image import /tmp/$IMAGE_NAME.tar
rm /tmp/$IMAGE_NAME.tar

# Update domain in ingress if not default
if [ "$DOMAIN" != "portfolio.example.com" ]; then
    echo -e "${YELLOW}Updating domain in ingress configuration...${NC}"
    sed -i "s/portfolio.example.com/$DOMAIN/g" k8s/ingress.yaml
fi

# Create namespace if it doesn't exist
if [ "$NAMESPACE" != "default" ]; then
    echo -e "${YELLOW}Creating namespace $NAMESPACE...${NC}"
    microk8s kubectl create namespace $NAMESPACE --dry-run=client -o yaml | microk8s kubectl apply -f -
fi

# Apply Kubernetes manifests
echo -e "${YELLOW}Deploying application...${NC}"
microk8s kubectl apply -k k8s/ -n $NAMESPACE

# Wait for deployment to be ready
echo -e "${YELLOW}Waiting for deployment to be ready...${NC}"
microk8s kubectl wait --for=condition=available --timeout=300s deployment/portfolio-webapp -n $NAMESPACE

# Show status
echo ""
echo -e "${GREEN}Deployment successful!${NC}"
echo ""
echo "Resources created:"
microk8s kubectl get pods,svc,ingress -n $NAMESPACE -l app=portfolio-webapp

echo ""
echo -e "${GREEN}Application deployed successfully!${NC}"
echo "Access the application at: https://$DOMAIN"
echo ""
echo "Useful commands:"
echo "  View logs: microk8s kubectl logs -f deployment/portfolio-webapp -n $NAMESPACE"
echo "  Check status: microk8s kubectl get pods -n $NAMESPACE"
echo "  Scale deployment: microk8s kubectl scale deployment/portfolio-webapp --replicas=N -n $NAMESPACE"
echo "  Delete deployment: microk8s kubectl delete -k k8s/ -n $NAMESPACE"
