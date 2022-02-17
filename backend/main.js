const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const express = require('./dist/main.js');

async function createWindow() {
  console.log(express);
  const win = new BrowserWindow({
    width: 1024,
    height: 765,
    webPreferences: {
      nodeIntegration: true,
      show: false,
    },
  });
  win.loadURL('http://localhost:3000/loading.html');

  setTimeout(function () {
    win.loadURL('http://localhost:3000');
  }, 5000);

  win.once('ready-to-show', () => {
    win.reload();
    win.show();
  });
  win.focus();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
