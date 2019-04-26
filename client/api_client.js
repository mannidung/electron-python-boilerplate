const zerorpc = require('zerorpc')

/** Address to use for the zerorpc server */
const SERVER_ADDRESS = "127.0.0.1"

/** Port to use for the zerorpc server */
const SERVER_PORT = 8484

// Create zerorpc client
let client = new zerorpc.Client()

// Connect to the zerorpc server which is run in python
client.connect("tcp://" + SERVER_ADDRESS
                + ":" + SERVER_PORT)

const API = {
    /**
     * @param text The text to be echoed
     * @param callback Callback function to handle the echoed value
     * @returns Null if an error is thrown
     */
    echo: (text, callback) => {
        // Invoke command on server side
        client.invoke("echo", text, (error, result) => {
            if(error) {
                console.error(error)
                return null
            } else {
                callback(result)
            }
        })
    }
}

// Make sure object can't be changed
Object.freeze(API)

// Export the API
module.exports = {API}