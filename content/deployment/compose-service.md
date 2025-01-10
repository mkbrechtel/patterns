# 🐋 Docker/Podman Compose Service Pattern

## 📋 Overview
This pattern describes how to structure and manage services running with docker-compose on Debian stable systems.

## 🎯 Goals
- Consistent service deployment structure
- Predictable locations and configurations
- Easy backup and maintenance
- Secure default settings

## 📂 Directory Structure
```bash
/srv/{hostname}/          # Root directory for the service
├── compose.yml          # Main compose file (new standard name)
├── .env                 # Environment variables
└── SERVICE.md           # Service documentation
```

## 🛠️ Base Requirements
- Debian Stable (current: Bookworm)
- docker.io and docker-compose from debian-stable repository with apt
- Regular system updates via unattended-upgrades

## 📝 Manual Service Setup

### System Packages
```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin apparmor
```

### Service Directory
```bash
mkdir /srv/{hostname}
cd /srv/hostname}
```

### Base Compose File
compose.yml:
```yaml
version: '3.9'

services:
  app:
    image: application:version
    restart: unless-stopped
    environment:
      - TZ=UTC
    env_file: .env
    volumes:
      - ./config:/config:ro
      - ./data:/data
    networks:
      - proxy
      - app_net

networks:
  proxy:
    external: true
  app_net:
    driver: bridge
```

## 🔐 Security Practices
- Use specific version tags
- Restrict directory permissions
- Read-only mounts where possible
- Limit network exposure
- Run services as non-root user

## 🔄 Operations

### Start/Stop
```bash
cd /srv/{hostname}
docker compose up -d    # Start
docker compose down     # Stop
```

### Updates
```bash
cd /srv/{hostname}
docker compose pull
docker compose up -d
```

## ⚠️ Anti-patterns
- Using latest tag
- Storing secrets in compose.yml
- Direct modification of container data

## 💡 Tips
- Document service specifics in SERVICE.md
- Use .env-File for configuration
- Enable health checks
