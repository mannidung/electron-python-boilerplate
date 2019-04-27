const zerorpc = require('zerorpc')
const config = require('../config/config')

// Create zerorpc client
let client = new zerorpc.Client()

// Connect to the zerorpc server which is run in python
client.connect("tcp://" + config.ZERORPC_HOST
                + ":" + config.ZERORPC_PORT)

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