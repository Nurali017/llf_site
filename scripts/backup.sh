#!/bin/bash

BACKUP_DIR="$HOME/backups/llf-site"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "📦 Creating backup..."

# Backup code
tar -czf "$BACKUP_DIR/code_$DATE.tar.gz" \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    .

echo "✅ Backup created: $BACKUP_DIR/code_$DATE.tar.gz"
