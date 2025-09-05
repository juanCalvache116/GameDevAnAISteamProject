const { app, BrowserWindow, Menu, dialog, shell, ipcMain, powerSaveBlocker } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

// ==========================================
// GPU PERFORMANCE OPTIMIZATION FLAGS
// ==========================================

// Prefer real GPU paths (especially on Windows)
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');

// Windows-specific ANGLE backend optimization
if (process.platform === 'win32') {
    app.commandLine.appendSwitch('use-angle', 'd3d11'); // D3D11 backend for better performance
    app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion'); // Avoid occlusion throttling
}

// Disable software rendering fallback for consistent performance
app.commandLine.appendSwitch('disable-software-rasterizer');

// Keep a global reference of the window object
let mainWindow;
let isMenuBarVisible = true; // Track menu bar visibility state
let powerSaveBlockerId; // Track power save blocker

// Enable live reload for development (with error handling)
if (isDev) {
    try {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
            hardResetMethod: 'exit'
        });
        console.log('🔄 Hot reload enabled');
    } catch (e) {
        console.log('ℹ️  Hot reload not available - install electron-reload for development convenience');
    }
}

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        show: false, // Don't show until ready
        icon: getIconPath(),
        webPreferences: {
            nodeIntegration: false, // Security best practice
            contextIsolation: true, // Security best practice  
            enableRemoteModule: false, // Security best practice
            preload: path.join(__dirname, 'src', 'preload.js'), // Optional preload script
            webSecurity: true,
            allowRunningInsecureContent: false,
            // Performance optimizations for WebGL
            backgroundThrottling: false, // Disable window throttling for smooth game performance
            offscreen: false, // Ensure on-screen rendering
            hardwareAcceleration: true // Enable hardware acceleration
        },
        titleBarStyle: 'default',
        backgroundColor: '#0a1428', // Match game background
        title: 'Drowned Heart - A Cursed Tale of Love and Betrayal'
    });

    // Load the app
    const indexPath = isDev 
        ? path.join(__dirname, 'src', 'index.html')
        : path.join(__dirname, 'src', 'index.html');
    
    mainWindow.loadFile(indexPath);

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
        
        // GPU diagnostics and performance monitoring
        console.log('🖥️  GPU Feature Status:');
        console.table(app.getGPUFeatureStatus());
        
        // Start power save blocker to prevent display sleep during gameplay
        powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
        console.log('⚡ Power save blocker started:', powerSaveBlockerId);
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Prevent navigation to external sites
    mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        
        if (parsedUrl.origin !== 'file://') {
            event.preventDefault();
        }
    });

    // Add global keyboard shortcuts
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F1' && input.type === 'keyDown') {
            toggleMenuBar();
        }
    });

    // Create application menu
    createMenu();
}

function getIconPath() {
    if (process.platform === 'win32') {
        return path.join(__dirname, 'build', 'icon.ico');
    } else if (process.platform === 'darwin') {
        return path.join(__dirname, 'build', 'icon.icns');
    } else {
        return path.join(__dirname, 'build', 'icon.png');
    }
}

function toggleMenuBar() {
    if (!mainWindow) return;
    
    isMenuBarVisible = !isMenuBarVisible;
    
    // Toggle menu bar visibility
    mainWindow.setMenuBarVisibility(isMenuBarVisible);
    mainWindow.setAutoHideMenuBar(!isMenuBarVisible);
    
    // Show visual feedback
    const status = isMenuBarVisible ? 'shown' : 'hidden';
    console.log(`🔧 Menu bar ${status} (F1 to toggle)`);
    
    // Send notification to renderer process
    if (mainWindow.webContents) {
        mainWindow.webContents.send('menu-bar-toggled', {
            visible: isMenuBarVisible,
            message: `Menu bar ${status} (Press F1 to toggle)`
        });
    }
}

function createMenu() {
    const template = [
        {
            label: 'Game',
            submenu: [
                {
                    label: 'New Game',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('menu-new-game');
                    }
                },
                {
                    label: 'Main Menu',
                    accelerator: 'CmdOrCtrl+M',
                    click: () => {
                        mainWindow.webContents.send('menu-main-menu');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                {
                    label: 'Toggle Menu Bar',
                    accelerator: 'F1',
                    click: () => {
                        toggleMenuBar();
                    }
                },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About Drowned Heart',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About Drowned Heart',
                            message: 'Drowned Heart',
                            detail: 'A Cursed Tale of Love and Betrayal\n\nVersion: 1.0.0\n\nA grid-based puzzle adventure game where you explore a cursed island, solve mysteries, and uncover the secrets of an ancient amulet.',
                            buttons: ['OK']
                        });
                    }
                },
                {
                    label: 'Controls',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Game Controls',
                            message: 'Controls',
                            detail: '🎮 Game Controls:\n• WASD or Arrow Keys - Move character\n• E - Absorb/Transfer essence\n• F - Interact with objects\n• ESC - Return to menu\n• Mouse - Menu navigation\n\n🔧 Window Controls:\n• F1 - Toggle menu bar visibility\n• F11 - Toggle fullscreen (system default)',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    // macOS specific menu adjustments
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });

        // Window menu
        template[4].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // On macOS, keep app running even when all windows are closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        shell.openExternal(navigationUrl);
    });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (isDev) {
        // In development, ignore certificate errors
        event.preventDefault();
        callback(true);
    } else {
        // In production, use default behavior
        callback(false);
    }
});

// Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, url) => {
        if (url !== contents.getURL() && !url.startsWith('file://')) {
            event.preventDefault();
        }
    });
});

// IPC handlers for menu actions
ipcMain.handle('app-version', () => {
    return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
    const result = await dialog.showMessageBox(mainWindow, options);
    return result;
});

// ==========================================
// APP LIFECYCLE MANAGEMENT
// ==========================================

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    // Clean up power save blocker
    if (powerSaveBlockerId && powerSaveBlocker.isStarted(powerSaveBlockerId)) {
        powerSaveBlocker.stop(powerSaveBlockerId);
        console.log('⚡ Power save blocker stopped');
    }
    
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Export for testing
module.exports = { createWindow };
