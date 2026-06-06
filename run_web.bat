@echo off
echo =======================================
echo     Starting MCQ Exam System (Native)
echo =======================================

echo Starting Django Backend...
start "MCQ Backend" cmd /k "cd mcq_backend && ..\venv\Scripts\activate && python manage.py migrate && python manage.py runserver"

echo Starting React Frontend...
start "MCQ Frontend" cmd /k "cd mcq_frontend && npm run dev"

echo Waiting for services to initialize...
timeout /t 5 /nobreak > NUL

echo Opening system in your default browser...
start http://localhost:5173

echo.
echo The system is now running in separate windows.
echo To stop the system, close the two command windows that just opened.
echo.
pause
