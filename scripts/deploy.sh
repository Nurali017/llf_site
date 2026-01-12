#!/bin/bash

set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Load environment variables
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '^#' | xargs)
fi

# Build and restart with Docker
echo "🐳 Building Docker image..."
docker-compose build

echo "🔄 Restarting containers..."
docker-compose down
docker-compose up -d

# Wait for app to start
echo "⏳ Waiting for app to start..."
sleep 10

# Health check
echo "🏥 Performing health check..."
curl -f http://localhost:3000 || echo "⚠️ Health check failed"

echo "✅ Deployment completed!"
