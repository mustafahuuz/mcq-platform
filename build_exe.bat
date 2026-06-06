@echo off
echo =======================================
echo     Building MCQ System Executable
echo =======================================

cd mcq_frontend
echo Installing dependencies if missing...
call npm install

echo Building React and Electron Application...
call npm run build-exe

echo.
echo Build complete! Your executable should be in the mcq_frontend/dist directory.
pause
