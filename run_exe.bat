@echo off
echo =======================================
echo     Starting MCQ Exam System (App)
echo =======================================

echo Starting Django Backend...
start "MCQ Backend" /MIN cmd /k "cd mcq_backend && ..\venv\Scripts\activate && python manage.py runserver"

echo Launching Desktop Application...
cd mcq_frontend
call npm run electron

echo.
echo Desktop Application closed. Shutting down backend...
taskkill /FI "WINDOWTITLE eq MCQ Backend*" /T /F >nul 2>&1
echo Done.
pause
