import { BrowserWindow } from 'electron';

const webPreferences = {
  nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
  contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
}

export const createMainWindow = async function () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: webPreferences
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

export const createPresentationWindow = async function (externalDisplay) {
  // Create the browser window.
  const win = new BrowserWindow({
    x: externalDisplay.bounds.x,
    y: externalDisplay.bounds.y,
    width: 1024,
    height: 600,
    resizable: false,
    movable: false,
    webPreferences: webPreferences
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/present')
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html/#/present')
  }

  win.maximize();
  win.show();
}
