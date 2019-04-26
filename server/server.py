"""
Script for starting a zerorpc server on the specified port.
The port can be given as a command line argument when starting the server.
Is no port specified, then port 8484 is used.

The API exposed is defined in the file API.py.
"""

import sys
import zerorpc

# Import Python API
import API

def parse_port():
    """ Parse port from command line arguments. """
    port = 8484
    try:
        port = int(sys.argv[1])
    except Exception as e:
        print("CLI argument for port could not be parsed: " + str(e))
        print("Fall back on default port: " + str(port))
        pass
    return '{}'.format(port)


def main():
    """ Start zerorpc server and keep it running. """
    print("Starting python server...")

    # Set address to localhost
    address = "tcp://127.0.0.1:" + parse_port()

    # Start server with class API as 
    server = zerorpc.Server(API.API())
    server.bind(address)

    print("Server started running on {}".format(address))

    # Blocking command. Keeps server running
    server.run()

if __name__ == "__main__":
    main()