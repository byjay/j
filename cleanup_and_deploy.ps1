# Cleanup and Deploy Script
# Removes temp files and performs a clean deploy

Write-Host "🧹 Starting Cleanup..." -ForegroundColor Cyan

# 1. Cleanup specific folders/files
$trash = @(".netlify", "__pycache__", "*.log")
foreach ($item in $trash) {
    if (Test-Path $item) {
        Remove-Item -Recurse -Force $item
        Write-Host "Deleted $item" -ForegroundColor Gray
    }
}

# 2. Run Deployment
Write-Host "🚀 Starting Deployment..." -ForegroundColor Cyan
python deploy_now.py

# 3. Netlify Deploy
Write-Host "☁️  Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod --dir .

Write-Host "✅ Done!" -ForegroundColor Green
