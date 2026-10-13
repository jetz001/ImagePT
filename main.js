const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const path = require('path');
const fs = require('fs');

// Disable GPU cache lock collision on Windows
app.commandLine.appendSwitch('disable-gpu-cache');

let mainWindow;

// Prevent multiple instances from colliding on cache locks
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1320,
      height: 890,
      minWidth: 1024,
      minHeight: 700,
      backgroundColor: '#090d16',
      title: 'ImagePT - AI Prompt Studio',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      },
      autoHideMenuBar: true
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  // IPC Handlers
  ipcMain.handle('read-file-buffer', async (event, filePath) => {
    try {
      const buffer = fs.readFileSync(filePath);
      return buffer;
    } catch (err) {
      console.error('Failed to read file:', err);
      throw err;
    }
  });

  ipcMain.handle('copy-to-clipboard', async (event, text) => {
    clipboard.writeText(text);
    return true;
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
