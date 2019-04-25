// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

/*
CREATE PYTHON PROCESS
*/

/**
 * Path to the python environment directory.
 */
const PYTHON_ENVIRONMENT_DIR = "venv"

/**
 * Directory where the python server defined in PYTHON_SERVER resides.
 */
const PYTHON_SERVER_DIR = "server"

/**
 * Name of the python file containing the python server.
 */
const PYTHON_SERVER = "server.py"


let pythonProcess = null
let pythonPort = null

/**
 * Get the path to the python executable
 * @returns Full path to the python executable
 */
function getPythonPath() {
  return path.join(__dirname, PYTHON_ENVIRONMENT_DIR ,"bin", "python")
}

/**
 * Get the path to the python program acting as server
 * @returns Full path to the python server
 */
function getPythonServerPath() {
  return path.join(__dirname, PYTHON_SERVER_DIR, PYTHON_SERVER)
}

/**
 * Get port number for the python server process
 * @returns Port number to use for the python server process
 */
function selectPort() {
  pythonPort = 8484
  return pythonPort
}

/**
 * Creates and spawns the python server as a child process of the Node.js application
 * @returns The child process containing the python server
 */
function createPythonProcess() {
  let pythonScriptPath = getPythonServerPath()
  let port = '' + selectPort()

  pythonProcess = require('child_process').spawn(getPythonPath, [pythonScriptPath, port])

  // Print stdout and stderr to console
  pythonProcess.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  pythonProcess.on('data', (data) => {
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
app.on('ready', createPythonProcess())
app.on('will-quit', closePythonProcess())


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
  // mainWindow.webContents.openDevTools()

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