# Fix Next.js cache issues utility script
Write-Host "Cleaning Next.js cache to fix build issues..." -ForegroundColor Yellow

# Stop any running Next.js servers (adjust port if needed)
$nextProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" }
if ($nextProcess) {
    Write-Host "Stopping Next.js process..." -ForegroundColor Yellow
    Stop-Process -Id $nextProcess.Id -Force
    Start-Sleep -Seconds 2
}

# Remove .next directory
if (Test-Path .next) {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
}

# Clear npm cache (optional)
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Cache cleanup completed successfully!" -ForegroundColor Green
Write-Host "You can now restart your development server with 'npm run dev'" -ForegroundColor Cyan
