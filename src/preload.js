const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // App info
    getVersion: () => ipcRenderer.invoke('app-version'),
    
    // Dialog methods
    showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
    
    // Menu events - listen for menu actions from main process
    onMenuAction: (callback) => {
        ipcRenderer.on('menu-new-game', callback);
        ipcRenderer.on('menu-main-menu', callback);
    },
    
    // Menu bar toggle event
    onMenuBarToggled: (callback) => {
        ipcRenderer.on('menu-bar-toggled', callback);
    },
    
    // Remove listeners
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    
    // Platform info
    platform: process.platform,
    
    // Development mode check
    isDev: process.env.NODE_ENV === 'development' || process.argv.includes('--dev')
});

// Security: Remove Node.js globals in renderer
delete window.require;
delete window.exports;
delete window.module;

// Security: Prevent access to Node.js APIs
window.eval = global.eval = () => {
    throw new Error(`This app does not support eval() for security reasons.`);
};

console.log('🌊 Drowned Heart - Preload script loaded successfully');
