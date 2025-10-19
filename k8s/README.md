# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the portfolio application to a micro-k8s cluster with cert-manager and ingress controller.

## Prerequisites

1. **micro-k8s** installed and running
2. **cert-manager** installed in the cluster
3. **ingress controller** (nginx) enabled in micro-k8s

### Setting up micro-k8s

If you haven't already set up micro-k8s, here's a quick guide:

```bash
# Install micro-k8s
sudo snap install microk8s --classic

# Enable required addons
microk8s enable dns
microk8s enable ingress
microk8s enable cert-manager

# Check status
microk8s status
```

### Setting up cert-manager ClusterIssuer

Before deploying, you need to create a ClusterIssuer for cert-manager. Create a file `cluster-issuer.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # Replace with your email
    email: your-email@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
```

Apply it:

```bash
microk8s kubectl apply -f cluster-issuer.yaml
```

## Configuration

Before deploying, update the following:

1. **ingress.yaml**: Replace `portfolio.example.com` with your actual domain name
2. **deployment.yaml**: Update the image name if using a container registry
3. **kustomization.yaml**: Update the image configuration if needed

## Building the Docker Image

Build the Docker image from the root of the repository:

```bash
# Build the image
docker build -t portfolio-webapp:latest .

# If using micro-k8s, import the image
docker save portfolio-webapp:latest > portfolio-webapp.tar
microk8s ctr image import portfolio-webapp.tar
```

Alternatively, if using a container registry:

```bash
# Tag the image
docker tag portfolio-webapp:latest your-registry/portfolio-webapp:latest

# Push to registry
docker push your-registry/portfolio-webapp:latest

# Update k8s/kustomization.yaml with your registry URL
```

## Deployment

### Option 1: Using the Deployment Script (Recommended)

The easiest way to deploy is using the provided script:

```bash
# Deploy with default settings
cd k8s
./deploy.sh

# Deploy with custom domain and namespace
DOMAIN=myportfolio.com NAMESPACE=production ./deploy.sh
```

The script will:
- Build the Docker image
- Import it to micro-k8s
- Deploy all Kubernetes resources
- Wait for the deployment to be ready
- Show the deployment status

### Option 2: Using kubectl

Deploy all manifests:

```bash
# Deploy to default namespace
microk8s kubectl apply -f k8s/

# Or deploy to a specific namespace
microk8s kubectl create namespace portfolio
microk8s kubectl apply -f k8s/ -n portfolio
```

### Option 3: Using Kustomize

```bash
# Deploy using kustomize
microk8s kubectl apply -k k8s/

# Or to a specific namespace
microk8s kubectl apply -k k8s/ -n portfolio
```

## Verifying the Deployment

Check the deployment status:

```bash
# Check pods
microk8s kubectl get pods -l app=portfolio-webapp

# Check service
microk8s kubectl get svc portfolio-webapp

# Check ingress
microk8s kubectl get ingress portfolio-webapp

# Check certificate (after a few minutes)
microk8s kubectl get certificate
```

View logs:

```bash
# Get pod name
microk8s kubectl get pods -l app=portfolio-webapp

# View logs
microk8s kubectl logs <pod-name>

# Follow logs
microk8s kubectl logs -f <pod-name>
```

## Accessing the Application

Once deployed and the certificate is ready:

1. Ensure your DNS points to your cluster's IP
2. Access the application at: `https://portfolio.example.com`

For local testing, you can add an entry to `/etc/hosts`:

```bash
<your-cluster-ip> portfolio.example.com
```

## Updating the Deployment

After making changes to the application:

```bash
# Rebuild the Docker image
docker build -t portfolio-webapp:latest .

# Import to micro-k8s
docker save portfolio-webapp:latest > portfolio-webapp.tar
microk8s ctr image import portfolio-webapp.tar

# Restart the deployment to pull the new image
microk8s kubectl rollout restart deployment/portfolio-webapp

# Watch the rollout status
microk8s kubectl rollout status deployment/portfolio-webapp
```

## Scaling

Scale the deployment:

```bash
# Scale to 3 replicas
microk8s kubectl scale deployment/portfolio-webapp --replicas=3

# Scale to 1 replica
microk8s kubectl scale deployment/portfolio-webapp --replicas=1
```

## Troubleshooting

### Certificate not being issued

Check cert-manager logs:

```bash
microk8s kubectl logs -n cert-manager deployment/cert-manager
```

Check certificate status:

```bash
microk8s kubectl describe certificate portfolio-webapp-tls
```

### Pod not starting

Check pod events:

```bash
microk8s kubectl describe pod <pod-name>
```

Check pod logs:

```bash
microk8s kubectl logs <pod-name>
```

### Ingress not working

Check ingress controller logs:

```bash
microk8s kubectl logs -n ingress deployment/nginx-ingress-microk8s-controller
```

Check ingress status:

```bash
microk8s kubectl describe ingress portfolio-webapp
```

## Resource Management

The deployment includes resource requests and limits:

- **Requests**: 256Mi memory, 100m CPU
- **Limits**: 512Mi memory, 500m CPU

Adjust these in `deployment.yaml` based on your cluster capacity and application needs.

## Health Checks

The deployment includes:

- **Liveness Probe**: Checks if the container is alive (restarts if failing)
- **Readiness Probe**: Checks if the container is ready to serve traffic

Both probes make HTTP GET requests to the root path `/`.

## Cleanup

### Using the Cleanup Script

The easiest way to remove the deployment:

```bash
cd k8s
./cleanup.sh

# Or for a specific namespace
NAMESPACE=production ./cleanup.sh
```

### Manual Cleanup

To remove the deployment manually:

```bash
# Delete all resources
microk8s kubectl delete -k k8s/

# Or delete individually
microk8s kubectl delete -f k8s/
```

## Additional Resources

- [micro-k8s documentation](https://microk8s.io/docs)
- [cert-manager documentation](https://cert-manager.io/docs/)
- [Kubernetes Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
