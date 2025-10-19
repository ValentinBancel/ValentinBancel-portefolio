# Troubleshooting Guide

This guide helps you diagnose and fix common issues when deploying the portfolio application to micro-k8s.

## Common Issues

### 1. Pods Not Starting

**Symptom:** Pods stuck in `Pending`, `CrashLoopBackOff`, or `ImagePullBackOff` state.

**Diagnosis:**
```bash
microk8s kubectl get pods -l app=portfolio-webapp
microk8s kubectl describe pod <pod-name>
microk8s kubectl logs <pod-name>
```

**Possible Causes & Solutions:**

#### ImagePullBackOff
- **Cause:** Image not available in micro-k8s
- **Solution:** 
  ```bash
  docker save portfolio-webapp:latest > portfolio-webapp.tar
  microk8s ctr image import portfolio-webapp.tar
  ```

#### CrashLoopBackOff
- **Cause:** Application failing to start
- **Solution:** Check logs:
  ```bash
  microk8s kubectl logs <pod-name>
  ```
  Common issues:
  - Missing dependencies: Rebuild Docker image
  - Port already in use: Check PORT environment variable
  - Memory limits too low: Increase in `deployment.yaml`

#### Pending (Insufficient Resources)
- **Cause:** Not enough CPU/memory available
- **Solution:** 
  ```bash
  # Check node resources
  microk8s kubectl top nodes
  
  # Reduce resource requests in deployment.yaml
  # Or add more nodes to cluster
  ```

### 2. Certificate Not Being Issued

**Symptom:** Certificate remains in `Pending` or `Failed` state.

**Diagnosis:**
```bash
microk8s kubectl get certificate
microk8s kubectl describe certificate portfolio-webapp-tls
microk8s kubectl logs -n cert-manager deployment/cert-manager
```

**Possible Causes & Solutions:**

#### ClusterIssuer Not Found
- **Cause:** ClusterIssuer not created or wrong name
- **Solution:**
  ```bash
  # Check if ClusterIssuer exists
  microk8s kubectl get clusterissuer
  
  # Create it if missing
  microk8s kubectl apply -f k8s/cluster-issuer.yaml
  ```

#### DNS Not Resolving
- **Cause:** Domain not pointing to cluster
- **Solution:** 
  - Verify DNS: `nslookup portfolio.example.com`
  - Check ingress IP: `microk8s kubectl get ingress`
  - Ensure DNS points to correct IP

#### Rate Limit Hit
- **Cause:** Too many requests to Let's Encrypt
- **Solution:** 
  - Use staging environment for testing
  - Edit `ingress.yaml` to use `letsencrypt-staging`
  - Wait for rate limit to reset

### 3. Ingress Not Working

**Symptom:** Cannot access application via domain name.

**Diagnosis:**
```bash
microk8s kubectl get ingress
microk8s kubectl describe ingress portfolio-webapp
microk8s kubectl logs -n ingress deployment/nginx-ingress-microk8s-controller
```

**Possible Causes & Solutions:**

#### Ingress Controller Not Enabled
- **Cause:** micro-k8s ingress addon not enabled
- **Solution:**
  ```bash
  microk8s enable ingress
  ```

#### Service Not Found
- **Cause:** Service name mismatch in ingress
- **Solution:**
  ```bash
  # Verify service exists
  microk8s kubectl get svc portfolio-webapp
  
  # Check ingress points to correct service
  microk8s kubectl get ingress portfolio-webapp -o yaml
  ```

#### DNS Resolution Issues
- **Cause:** Domain not resolving or pointing to wrong IP
- **Solution:**
  - Get ingress IP: `microk8s kubectl get ingress`
  - Test locally: Add to `/etc/hosts`
    ```
    <ingress-ip> portfolio.example.com
    ```

### 4. Application Not Responding

**Symptom:** Pods running but health checks failing or 502/503 errors.

**Diagnosis:**
```bash
microk8s kubectl logs -f <pod-name>
microk8s kubectl exec -it <pod-name> -- sh
# Inside pod:
curl http://localhost:4000
```

**Possible Causes & Solutions:**

#### Port Mismatch
- **Cause:** Application not listening on expected port
- **Solution:** 
  - Check PORT environment variable
  - Verify server.ts uses PORT env var
  - Update deployment.yaml if port changed

#### Health Check Failure
- **Cause:** Health check path wrong or too aggressive
- **Solution:**
  ```bash
  # Test health check manually
  microk8s kubectl exec <pod-name> -- wget -O- http://localhost:4000/
  
  # Adjust probe settings in deployment.yaml:
  # - Increase initialDelaySeconds
  # - Increase timeoutSeconds
  # - Decrease periodSeconds
  ```

#### Out of Memory
- **Cause:** Application consuming too much memory
- **Solution:**
  ```bash
  # Check memory usage
  microk8s kubectl top pod <pod-name>
  
  # Increase memory limit in deployment.yaml
  ```

### 5. Deployment Script Fails

**Symptom:** `./deploy.sh` exits with errors.

**Possible Causes & Solutions:**

#### micro-k8s Not Installed
- **Solution:**
  ```bash
  sudo snap install microk8s --classic
  sudo usermod -a -G microk8s $USER
  sudo chown -f -R $USER ~/.kube
  newgrp microk8s
  ```

#### Docker Build Fails
- **Cause:** Dependencies not available or network issues
- **Solution:**
  - Check Docker daemon: `docker ps`
  - Try manual build: `docker build -t portfolio-webapp:latest .`
  - Check network connectivity

#### Permission Denied
- **Cause:** User not in microk8s group
- **Solution:**
  ```bash
  sudo usermod -a -G microk8s $USER
  newgrp microk8s
  ```

## Debugging Commands

### View All Resources
```bash
microk8s kubectl get all -l app=portfolio-webapp
```

### Get Detailed Pod Information
```bash
microk8s kubectl describe pod <pod-name>
```

### View Real-time Logs
```bash
microk8s kubectl logs -f deployment/portfolio-webapp
```

### Get Events
```bash
microk8s kubectl get events --sort-by='.lastTimestamp'
```

### Execute Commands in Pod
```bash
microk8s kubectl exec -it <pod-name> -- sh
```

### Check Service Endpoints
```bash
microk8s kubectl get endpoints portfolio-webapp
```

### Test Service Connectivity
```bash
# From another pod
microk8s kubectl run test --rm -it --image=alpine -- sh
# Inside test pod:
wget -O- http://portfolio-webapp
```

### Check Ingress Configuration
```bash
microk8s kubectl get ingress portfolio-webapp -o yaml
```

### View cert-manager Logs
```bash
microk8s kubectl logs -n cert-manager deployment/cert-manager
```

## Performance Issues

### Application Slow to Start
- Increase `initialDelaySeconds` for probes
- Check if database/external services are accessible
- Review application logs for startup issues

### High Memory Usage
- Check for memory leaks in application
- Increase memory limits
- Consider horizontal pod autoscaling

### High CPU Usage
- Profile the application
- Increase CPU limits
- Scale horizontally with more replicas

## Network Issues

### Cannot Access from Outside Cluster
1. Check ingress controller is running:
   ```bash
   microk8s kubectl get pods -n ingress
   ```

2. Verify ingress has an external IP:
   ```bash
   microk8s kubectl get ingress
   ```

3. Test from inside cluster:
   ```bash
   microk8s kubectl run test --rm -it --image=alpine -- sh
   wget -O- http://portfolio-webapp
   ```

### TLS Certificate Issues
1. Check certificate status:
   ```bash
   microk8s kubectl describe certificate portfolio-webapp-tls
   ```

2. Check cert-manager logs:
   ```bash
   microk8s kubectl logs -n cert-manager deployment/cert-manager
   ```

3. Verify ClusterIssuer:
   ```bash
   microk8s kubectl describe clusterissuer letsencrypt-prod
   ```

## Recovery Procedures

### Reset Deployment
```bash
# Delete and redeploy
cd k8s
./cleanup.sh
./deploy.sh
```

### Rollback to Previous Version
```bash
microk8s kubectl rollout undo deployment/portfolio-webapp
```

### Force Pod Restart
```bash
microk8s kubectl rollout restart deployment/portfolio-webapp
```

### Delete and Recreate Certificate
```bash
microk8s kubectl delete certificate portfolio-webapp-tls
microk8s kubectl delete secret portfolio-webapp-tls
# Certificate will be automatically recreated
```

## Getting Help

If you're still experiencing issues:

1. Collect diagnostic information:
   ```bash
   microk8s kubectl get all -n default
   microk8s kubectl describe pod <pod-name>
   microk8s kubectl logs <pod-name>
   microk8s kubectl get events
   ```

2. Check micro-k8s status:
   ```bash
   microk8s status
   microk8s inspect
   ```

3. Review documentation:
   - [k8s/README.md](README.md)
   - [DEPLOYMENT.md](../DEPLOYMENT.md)
   - [micro-k8s documentation](https://microk8s.io/docs)

4. Search for similar issues:
   - GitHub repository issues
   - micro-k8s community forums
   - Stack Overflow
