// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs')
const config = require('./config/config')


/*
CREATE PYTHON PROCESS
*/

let pythonProcess = null
let pythonPort = null

/**
 * Get the path to the python program acting as server
 * @returns Full path to the python server
 */
function getPythonServerPath() {
  // If the python server hasn't been packed, return path to the unpacked .py-file
  if (!guessPackaged()) {
    python_server_path = path.join(__dirname, config.PYTHON_SERVER_DIR, config.PYTHON_SERVER + '.py')
  } else { // Return path to the compiled/packed python server
    if (process.platform === 'win32') {
      python_server_path = path.join(__dirname, config.PYTHON_DIST_DIR, config.PYTHON_SERVER + '.exe')
    } else {
      python_server_path = path.join(__dirname, config.PYTHON_DIST_DIR, config.PYTHON_SERVER)
    }
  }
  if (config.DEBUG) {
    console.log("Guess packaged() returned: " + guessPackaged())
    console.log("Python server path: " + python_server_path)
  }
  return python_server_path
}

/**
 * Get port number for the python server process
 * @returns Port number to use for the python server process
 */
function selectPort() {
  pythonPort = config.ZERORPC_PORT
  return pythonPort
}

/**
 * Check if the app has been packaged or not.
 * @returns True if guessed that the app has been packaged.
 */
function guessPackaged() {
  fullPath = path.join(__dirname, config.PYTHON_DIST_DIR) // Why does this work?
  if (config.DEBUG) {
    console.log("Guess packaged path: " + fullPath)
  }
  return fs.existsSync(fullPath)
}

/**
 * Creates and spawns the python server as a child process of the Node.js application
 * @returns The child process containing the python server
 */
function createPythonProcess() {
  let pythonScriptPath = getPythonServerPath()
  let port = '' + selectPort()

  if (guessPackaged()) { // If the app has been packaged, use execFile instead of spawn
    pythonProcess = require('child_process').execFile(pythonScriptPath, [port])
  } else {
    pythonProcess = require('child_process').spawn('python', [pythonScriptPath, port])
  }

  // Print stdout and stderr to console
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  pythonProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

  return pythonProcess
}

/**
 * Kills the python process
 * @returns Nothing
 */
function closePythonProcess() {
  pythonProcess.kill()
  pythonProcess = null
  pythonPort = null
}

// Create python child processes
app.on('ready', createPythonProcess)
app.on('will-quit', closePythonProcess)


/*
 * WINDOW MANAGEMENT
 */

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join('gui', 'index.html'))

  // Open the DevTools.
  if (config.DEBUG) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.