@echo off
echo 🌊 Starting Drowned Heart Development Server ⚓
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting Electron in development mode...
call npm run dev
