@echo off
echo [JapBong] Starting System...

:: 1. Start Backend (Port 8000)
echo Starting Backend Server...
start "JapBong Backend (DO NOT CLOSE)" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

:: 2. Start Frontend (Port 3000) to avoid file:// CORS issues
echo Starting Frontend Server...
start "JapBong Frontend (DO NOT CLOSE)" cmd /k "python -m http.server 3000"

echo.
echo ===================================================
echo System is running!
echo Backend API: http://localhost:8000
echo Frontend UI: http://localhost:3000
echo ===================================================
echo.
echo Opening Frontend in your browser in 3 seconds...
timeout /t 3 >nul
start http://localhost:3000

pause
