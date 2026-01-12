# Deploy All Script
# Builds, Updates Timestamp, Checks Integrity, and Pushes to GitHub

Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Cyan

# 1. Run Python Deploy Script (Handles Integrity & Versioning)
python F:\genmini\japness\JAP_BONG_fam\deploy_now.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Sequence Completed." -ForegroundColor Green
} else {
    Write-Host "❌ Deployment Script Failed." -ForegroundColor Red
    exit 1
}
