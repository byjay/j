# Netlify Deployment Script
# Updates version and deploys to Netlify Production
# Usage: .\deploy-netlify.ps1

Write-Host "🚀 Starting Netlify Deployment..." -ForegroundColor Cyan

# 1. Run Build/Version Update Script
Write-Host "📦 Updating Build Version..." -ForegroundColor Yellow
python F:\genmini\japness\JAP_BONG_fam\deploy_now.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build/Version Update Failed!" -ForegroundColor Red
    exit 1
}

# 2. Deploy to Netlify (Production)
Write-Host "☁️  Deploying to Netlify (Prod)..." -ForegroundColor Yellow
# Assuming netlify-cli is installed and authenticated
# --dir . specifies current directory as publish folder
netlify deploy --prod --dir .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Netlify Deployment Successful!" -ForegroundColor Green
}
else {
    Write-Host "❌ Netlify Deployment Failed." -ForegroundColor Red
    Write-Host "Tip: Ensure 'netlify-cli' is installed (npm install -g netlify-cli) and you are logged in (netlify login)." -ForegroundColor Gray
}
