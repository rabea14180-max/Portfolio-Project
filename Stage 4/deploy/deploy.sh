#!/usr/bin/env bash
# Reference copy. The live version that GitHub Actions triggers runs from
# /opt/flexsight/deploy.sh on the server, deliberately outside this repo so
# `git reset --hard` during a deploy can't overwrite the script mid-run.
set -euo pipefail

REPO_DIR="/opt/flexsight/Portfolio-Project"
BACKEND_DIR="$REPO_DIR/Stage 4/backend"
FRONTEND_DIR="$REPO_DIR/Stage 4/frontend"

echo "==> Pulling latest main"
cd "$REPO_DIR"
git fetch origin main
git reset --hard origin/main

echo "==> Installing backend deps"
cd "$BACKEND_DIR"
./venv/bin/pip install -q -r requirements.txt

echo "==> Building frontend"
cd "$FRONTEND_DIR"
npm ci --silent
npm run build --silent

echo "==> Restarting services"
systemctl restart flexsight-backend
systemctl reload nginx

echo "==> Deploy finished: $(date -u +'%Y-%m-%dT%H:%M:%SZ') commit=$(git -C "$REPO_DIR" rev-parse --short HEAD)"
