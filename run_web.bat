@echo off
echo =======================================
echo     Starting MCQ Exam System (Web)
echo =======================================

echo 1. Starting background services (Database, API, Frontend)...
docker-compose up -d

echo 2. Waiting for services to initialize...
timeout /t 5 /nobreak > NUL

echo 3. Opening system in your default browser...
start http://localhost:5173

echo.
echo The system is now running in the background.
echo You can close this window. To stop the system later, run:
echo docker-compose down
echo.
pause
