/*
CONFIGURATION CONSTANTS
*/

/** Should debug output be printed? */
let DEBUG = true

/** Host to use for the zerorpc server */
let ZERORPC_HOST = "127.0.0.1"

/** Port to use for the zerorpc server */
let ZERORPC_PORT = 8484

/** Path to the pyinstaller build directory. */
let PYTHON_DIST_DIR = "python_dist"

/** Directory where the python server defined in PYTHON_SERVER resides. */
let PYTHON_SERVER_DIR = "server"

/** Name of the python app running the python server. */
let PYTHON_SERVER = "server" // !!!!without .py-ending!!!!


// Export the API
module.exports = {
    DEBUG,
    ZERORPC_HOST,
    ZERORPC_PORT,
    PYTHON_DIST_DIR,
    PYTHON_SERVER_DIR,
    PYTHON_SERVER
}
