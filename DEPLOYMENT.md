# CSR Agent Deployment Guide

This guide covers deploying the CSR Agent to production environments.

## Prerequisites

1. **LiveKit Cloud Account**: Active account with API credentials
2. **Google AI API Key**: Valid Gemini Live API key
3. **Docker**: Installed and running (for containerized deployment)
4. **Domain/SSL**: For production web deployment

## Environment Setup

### 1. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your production values:
```env
# Production LiveKit Configuration
LIVEKIT_URL=wss://your-production-room.livekit.cloud
LIVEKIT_API_KEY=your_production_api_key
LIVEKIT_API_SECRET=your_production_secret

# Production Google AI Configuration
GOOGLE_API_KEY=your_production_google_api_key
```

### 2. Security Considerations

- **Never commit `.env` to version control**
- **Use strong API secrets** and rotate them regularly
- **Enable SSL/TLS** for all communications
- **Implement rate limiting** to prevent abuse
- **Monitor logs** for unusual activity

## Deployment Options

### Option 1: Docker Compose (Recommended)

For local testing and simple deployments:

```bash
# Build and start the container
docker-compose up --build -d

# View logs
docker-compose logs -f csr-agent

# Stop the service
docker-compose down
```

### Option 2: Docker Standalone

For production environments:

```bash
# Build the image
docker build -t csr-agent:latest .

# Run with environment variables
docker run -d \
  --name csr-agent \
  --restart unless-stopped \
  -e LIVEKIT_URL=$LIVEKIT_URL \
  -e LIVEKIT_API_KEY=$LIVEKIT_API_KEY \
  -e LIVEKIT_API_SECRET=$LIVEKIT_API_SECRET \
  -e GOOGLE_API_KEY=$GOOGLE_API_KEY \
  -v $(pwd)/logs:/app/logs \
  csr-agent:latest
```

### Option 3: Cloud Platform Deployment

#### LiveKit Cloud

1. Push your Docker image to a registry
2. Deploy using LiveKit Cloud's agent deployment
3. Configure environment variables in the cloud console
4. Set up health checks and monitoring

#### AWS ECS

```bash
# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service --cluster csr-cluster --service-name csr-agent --task-definition csr-agent
```

#### Google Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy csr-agent \
  --image gcr.io/your-project/csr-agent \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars LIVEKIT_URL=$LIVEKIT_URL,GOOGLE_API_KEY=$GOOGLE_API_KEY
```

## Monitoring and Maintenance

### Health Checks

Implement health monitoring:
```python
# Add to csr_agent.py for production health checks
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "timestamp": time.time()}
```

### Log Management

- **Rotate logs**: Implement log rotation to prevent disk space issues
- **Centralize logs**: Send logs to centralized logging service
- **Alerting**: Set up alerts for errors and high latency

### Performance Monitoring

Monitor key metrics:
- **Session duration**: Average call length
- **Response latency**: Time to first response
- **Error rates**: Failed sessions vs total
- **Resource usage**: CPU, memory, network

## Scaling Considerations

### Horizontal Scaling

- **Load balancer**: Distribute sessions across multiple instances
- **Auto-scaling**: Scale based on concurrent session count
- **Geographic distribution**: Deploy close to users for low latency

### Vertical Scaling

- **CPU**: More cores for concurrent sessions
- **Memory**: More RAM for longer conversations
- **Network**: Higher bandwidth for better audio quality

## Security Best Practices

### API Security

1. **Rate Limiting**: Implement per-IP and per-user limits
2. **Input Validation**: Sanitize all user inputs
3. **Authentication**: Verify all API calls
4. **Encryption**: Use TLS for all communications

### Container Security

1. **Non-root user**: Run containers as non-root
2. **Minimal base image**: Use slim Docker images
3. **Security scanning**: Regular vulnerability scans
4. **Resource limits**: Set memory and CPU limits

## Troubleshooting Production Issues

### Common Problems

1. **Connection Failures**:
   - Check network connectivity
   - Verify API credentials
   - Review firewall rules

2. **Audio Quality Issues**:
   - Monitor network bandwidth
   - Check audio codec settings
   - Verify microphone permissions

3. **High Latency**:
   - Check geographic distance to servers
   - Monitor resource utilization
   - Review concurrent session limits

### Debug Mode

Enable debug logging in production:
```bash
# Set log level to DEBUG
export LOG_LEVEL=DEBUG
docker-compose up --build
```

## Backup and Recovery

### Data Backup

- **Configuration backups**: Regular backup of .env and config files
- **Log backups**: Archive logs regularly
- **State backups**: Backup any persistent state

### Disaster Recovery

- **Multi-region deployment**: Deploy to multiple regions
- **Health monitoring**: Automated failover
- **Recovery procedures**: Documented recovery steps

## Compliance and Legal

### Data Privacy

- **GDPR compliance**: Handle EU customer data appropriately
- **Data retention**: Define and implement retention policies
- **Consent management**: Record and respect user consent

### Call Recording

- **Notification**: Inform customers when calls are recorded
- **Storage**: Secure storage of recordings
- **Access control**: Limit access to recordings

## Support and Maintenance

### Regular Updates

- **Security patches**: Apply security updates promptly
- **Feature updates**: Update agent capabilities
- **Dependency updates**: Keep libraries current

### Monitoring Setup

```bash
# Example monitoring script
#!/bin/bash
while true; do
    curl -f http://localhost:8080/health || echo "Health check failed"
    sleep 30
done
```

This deployment guide ensures your CSR Agent runs reliably in production with proper security, monitoring, and scalability.
