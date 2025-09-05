@echo off
echo 🌊 Drowned Heart - Quick Test ⚓
echo.
echo This will install dependencies and run the app for testing...
echo.

echo Installing dependencies (including electron-reload for hot reload)...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ❌ npm install failed. Common fixes:
    echo 1. Make sure Node.js is installed
    echo 2. Try running as administrator
    echo 3. Clear npm cache: npm cache clean --force
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo Starting app in development mode...
echo.
echo 📋 What to look for:
echo ✅ App launches without JavaScript errors
echo ✅ Logo and music assets load correctly  
echo ✅ Smooth transition from splash to menu (no lag)
echo ✅ Background shader OR fallback CSS gradient works
echo ✅ Performance logs show good timing (check dev console)
echo.
echo 🎮 Controls:
echo - Press any key on splash screen to continue
echo - ESC to return to menu from game
echo.
echo Starting app...
call npm run dev
