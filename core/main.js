// Modules to control application life and create native browser window
const {app, screen, BrowserWindow, Menu} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, presentationWindow
let externalDisplay

function createMainWindow () {
  Menu.setApplicationMenu(false)

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, height: 600,
    minWidth: 1024, minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('view/main.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if (presentationWindow) presentationWindow.close()
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  let displays = screen.getAllDisplays()
  externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  createMainWindow();

  if (externalDisplay) createPresentationWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createMainWindow()
  if (presentationWindow === null) createPresentationWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createPresentationWindow () {
  // Create the browser window.
  presentationWindow = new BrowserWindow({
    x: externalDisplay.bounds.x, y: externalDisplay.bounds.y,
    width: externalDisplay.bounds.width, height: externalDisplay.bounds.height,
    resizable: false, movable: false,
    fullscreen: true
  })

  // and load the index.html of the app.
  presentationWindow.loadFile('view/presentation.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  presentationWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    presentationWindow = null
  })
}
