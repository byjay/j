@echo off
echo [JapBong] Starting Backend Verification Test...
echo.

:: 1. Install dependencies (just in case)
echo [1/3] Checking/Installing dependencies...
python -m pip install requests uvicorn fastapi beautifulsoup4
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Pip install failed. If packages are already installed, this might be fine.
    echo Continuing...
)

:: 2. Run the test script
echo.
echo [2/3] Running Test Script...
python test_backend_local.py

:: 3. Pause to let user see result
echo.
echo [3/3] Test Completed.
pause
