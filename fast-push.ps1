# Fast GitHub Push
# Quickly adds, commits, and pushes changes

param (
    [string]$Message = "auto: updates from automation script"
)

Write-Host "🚀 Fast Pushing to GitHub..." -ForegroundColor Cyan

git add .
git commit -m "$Message"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Fast Push Completed." -ForegroundColor Green
} else {
    Write-Host "❌ Push Failed." -ForegroundColor Red
}
