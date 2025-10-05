# Sage AI Backend Deployment Guide

## Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Copy environment file
   cp backend.env.example .env
   # Edit .env with your API keys and configuration
   
   # Start the server
   ./start.sh
   ```

2. **Using Docker**
   ```bash
   # Start all services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f api
   
   # Stop services
   docker-compose down
   ```

3. **Access the API**
   - API Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/api/health
   - Alternative Docs: http://localhost:8000/redoc

## DigitalOcean Deployment

### Option 1: DigitalOcean App Platform (Recommended)

1. **Create App**
   ```bash
   # Using doctl CLI
   doctl apps create --spec app-spec.yaml
   
   # Or use the DigitalOcean web interface
   ```

2. **App Spec Configuration** (`app-spec.yaml`)
   ```yaml
   name: sage-ai-backend
   services:
   - name: api
     source_dir: /
     github:
       repo: your-username/sage-ai-backend
       branch: main
     run_command: uvicorn app.main:app --host 0.0.0.0 --port 8080
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
     http_port: 8080
     health_check:
       http_path: /api/health
     envs:
     - key: ENVIRONMENT
       value: production
     - key: DATABASE_URL
       value: ${db.DATABASE_URL}
     - key: OPENAI_API_KEY
       value: your-openai-api-key
       type: SECRET
   
   databases:
   - name: db
     engine: PG
     version: "15"
     size: db-s-dev-database
   ```

3. **Environment Variables**
   Set these in the DigitalOcean App Platform dashboard:
   ```
   ENVIRONMENT=production
   OPENAI_API_KEY=your-openai-api-key
   GOOGLE_API_KEY=your-google-api-key
   SECRET_KEY=your-secret-key
   API_KEY=your-frontend-api-key
   ```

### Option 2: DigitalOcean Droplet

1. **Create Droplet**
   ```bash
   # Create Ubuntu 22.04 droplet
   doctl compute droplet create sage-ai-backend \
     --image ubuntu-22-04-x64 \
     --size s-1vcpu-1gb \
     --region nyc1 \
     --ssh-keys your-ssh-key-id
   ```

2. **Server Setup**
   ```bash
   # SSH into droplet
   ssh root@your-droplet-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install Python and dependencies
   apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib redis-server
   
   # Clone your repository
   git clone https://github.com/your-username/sage-ai-backend.git
   cd sage-ai-backend
   
   # Setup application
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Configure environment
   cp backend.env.example .env
   # Edit .env with production values
   ```

3. **Process Management with Systemd**
   ```bash
   # Create systemd service
   sudo nano /etc/systemd/system/sage-ai.service
   ```
   
   ```ini
   [Unit]
   Description=Sage AI Backend
   After=network.target
   
   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/path/to/sage-ai-backend
   Environment=PATH=/path/to/sage-ai-backend/venv/bin
   ExecStart=/path/to/sage-ai-backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   ```
   
   ```bash
   # Enable and start service
   sudo systemctl enable sage-ai
   sudo systemctl start sage-ai
   sudo systemctl status sage-ai
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

## Database Setup

### PostgreSQL Configuration

1. **Create Database**
   ```sql
   CREATE DATABASE sageai;
   CREATE USER sageai_user WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE sageai TO sageai_user;
   ```

2. **Connection String**
   ```
   DATABASE_URL=postgresql://sageai_user:your-password@localhost:5432/sageai
   ```

### Redis Setup

1. **Install and Configure**
   ```bash
   # Redis should be running on default port 6379
   redis-cli ping  # Should return PONG
   ```

2. **Connection String**
   ```
   REDIS_URL=redis://localhost:6379
   ```

## Monitoring and Logging

### Health Checks
- Endpoint: `GET /api/health`
- Expected Response: `{"status": "ok", "timestamp": "..."}`

### Logging
```python
# Configure structured logging
import structlog
logger = structlog.get_logger()
```

### Monitoring with Prometheus
```python
# Add to main.py
from prometheus_client import Counter, Histogram, generate_latest

REQUEST_COUNT = Counter('requests_total', 'Total requests', ['method', 'endpoint'])
REQUEST_LATENCY = Histogram('request_duration_seconds', 'Request latency')
```

## Security Checklist

- [ ] API key authentication implemented
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection protection
- [ ] HTTPS enabled (use Let's Encrypt)
- [ ] Environment variables secured
- [ ] Database credentials secured
- [ ] Regular security updates

## Performance Optimization

### Caching Strategy
```python
# Redis caching for expensive operations
import redis
redis_client = redis.Redis.from_url(REDIS_URL)

# Cache AI responses
@cache(expire=3600)  # 1 hour cache
async def get_ai_response(prompt: str):
    # AI API call
    pass
```

### Database Optimization
- Use connection pooling
- Implement database indexes
- Monitor query performance
- Use read replicas for analytics

### Load Balancing
```yaml
# Multiple instances in app-spec.yaml
services:
- name: api
  instance_count: 3  # Scale horizontally
  instance_size_slug: basic-xs
```

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Upload to DigitalOcean Spaces
s3cmd put backup_$(date +%Y%m%d).sql s3://your-backup-bucket/
```

### Application Backups
- Code: Git repository
- Configuration: Environment variables backup
- Logs: Centralized logging (e.g., Papertrail)

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -i :8000
   kill -9 <PID>
   ```

2. **Database Connection Issues**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Test connection
   psql $DATABASE_URL
   ```

3. **Memory Issues**
   ```bash
   # Monitor memory usage
   htop
   
   # Check application logs
   journalctl -u sage-ai -f
   ```

### Log Analysis
```bash
# View application logs
tail -f /var/log/sage-ai/app.log

# Search for errors
grep -i error /var/log/sage-ai/app.log
```

## Cost Optimization

### DigitalOcean App Platform Pricing
- Basic: $5/month (512MB RAM, 1 vCPU)
- Professional: $12/month (1GB RAM, 1 vCPU)
- Database: $15/month (1GB RAM, 1 vCPU, 10GB storage)

### Optimization Tips
- Use caching to reduce AI API calls
- Implement request batching
- Monitor and optimize database queries
- Use CDN for static assets
- Scale horizontally during peak times

## Support and Maintenance

### Regular Tasks
- [ ] Monitor application health
- [ ] Update dependencies monthly
- [ ] Review and rotate API keys
- [ ] Backup database weekly
- [ ] Monitor costs and usage
- [ ] Review security logs

### Emergency Procedures
1. **Service Down**: Check health endpoint, restart service
2. **Database Issues**: Check connections, review slow queries
3. **High CPU/Memory**: Scale up instances, optimize code
4. **Security Incident**: Rotate keys, review access logs

This deployment guide ensures a robust, scalable, and secure backend for the Sage AI application on DigitalOcean infrastructure.