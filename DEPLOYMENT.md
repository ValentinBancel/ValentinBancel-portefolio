# Deployment Guide

This document provides instructions for deploying the portfolio application.

## Kubernetes Deployment (micro-k8s)

The application can be deployed to a Kubernetes cluster using the manifests provided in the `k8s/` directory. This deployment is optimized for micro-k8s with cert-manager and ingress controller.

### Quick Start

1. **Build the Docker image:**
   ```bash
   docker build -t portfolio-webapp:latest .
   ```

2. **Import to micro-k8s:**
   ```bash
   docker save portfolio-webapp:latest > portfolio-webapp.tar
   microk8s ctr image import portfolio-webapp.tar
   ```

3. **Configure your domain:**
   - Edit `k8s/ingress.yaml` and replace `portfolio.example.com` with your domain

4. **Set up cert-manager ClusterIssuer:**
   ```bash
   # Copy and edit the example
   cp k8s/cluster-issuer.yaml.example k8s/cluster-issuer.yaml
   # Edit and add your email
   microk8s kubectl apply -f k8s/cluster-issuer.yaml
   ```

5. **Deploy the application:**
   ```bash
   microk8s kubectl apply -k k8s/
   ```

6. **Verify deployment:**
   ```bash
   microk8s kubectl get pods,svc,ingress
   ```

### Detailed Documentation

For comprehensive deployment instructions, troubleshooting, and configuration options, see [k8s/README.md](k8s/README.md).

## Docker Deployment (Standalone)

You can also run the application directly with Docker:

```bash
# Build the image
docker build -t portfolio-webapp:latest .

# Run the container
docker run -p 4000:4000 portfolio-webapp:latest
```

The application will be available at `http://localhost:4000`.

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  webapp:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Environment Variables

The application supports the following environment variables:

- `PORT`: The port the server listens on (default: 4000)
- `NODE_ENV`: Node environment (development/production)

## Health Checks

The application exposes the following endpoints for health monitoring:

- `/`: Main application endpoint (used for liveness and readiness probes)

## Monitoring

When deployed to Kubernetes, the application includes:

- **Liveness probes**: Ensures the container is running
- **Readiness probes**: Ensures the container is ready to receive traffic
- **Resource limits**: Prevents resource exhaustion

## Scaling

In Kubernetes, scale the deployment:

```bash
# Scale to 3 replicas
microk8s kubectl scale deployment/portfolio-webapp --replicas=3
```

## Updates

To update the application:

1. Build a new image with a new tag
2. Update the image in `k8s/kustomization.yaml`
3. Apply the changes: `microk8s kubectl apply -k k8s/`

Or use a rolling update:

```bash
microk8s kubectl set image deployment/portfolio-webapp webapp=portfolio-webapp:new-tag
```

## Backup and Restore

The application is stateless, so no data backup is required. Configuration is stored in:

- Kubernetes manifests (k8s/)
- Docker image

Keep these under version control.

## Security Considerations

- TLS certificates are automatically managed by cert-manager
- The application runs as a non-root user in the container
- Resource limits prevent DoS attacks
- The ingress controller provides additional security features

## Support

For issues or questions:
1. Check the logs: `microk8s kubectl logs <pod-name>`
2. Check events: `microk8s kubectl describe pod <pod-name>`
3. Review the [k8s/README.md](k8s/README.md) troubleshooting section
