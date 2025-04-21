@echo off
echo Cleaning Next.js cache to fix build issues...

:: Kill any running Next.js processes
taskkill /f /im node.exe /fi "WINDOWTITLE eq next*" > nul 2>&1

:: Remove .next directory
if exist .next (
  echo Removing .next directory...
  rmdir /s /q .next
)

:: Clear npm cache
echo Clearing npm cache...
call npm cache clean --force

echo.
echo Cache cleanup completed successfully!
echo You can now restart your development server with 'npm run dev'
echo.
pause
