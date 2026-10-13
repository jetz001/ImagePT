const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readFileBuffer: (filePath) => ipcRenderer.invoke('read-file-buffer', filePath),
  copyToClipboard: (text) => ipcRenderer.invoke('copy-to-clipboard', text)
});
