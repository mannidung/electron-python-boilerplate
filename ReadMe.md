# Electron-python-boilerplate

A starting point for setting up an app with an Electron GUI and a Python backend.

## Setup of python virtual environments
It is recommended that you set up two virtual environments for this project. One Python2 and one Python3. You will need the Python2 environment to be able to install the Node.js module zerorpc, since zerorpc needs to be compiled. The compiler in Node.js only works with Python3.

## Configuration files
* _Debug_ - Should debug output be active or not.
* _ZeroRPC_ - Settings related to the ZeroRPC server
    * _connection_ - Settings related to the connection to the ZeroRPC server
        * _host_ - Address of the backend server, default is localhost or 127.0.0.1 
        * _port_ - Port of the backend server, default is 8484
* _Python_ - Settings related to the python backend server
    * _path_ - Settings related to the paths
        * _environment dir_ - Base directory of the python environment. It is assumed that the python executable is in the subfolder bin/
        * _server dir_ - Directory in which the server script resides
        * _server script_ - Name of the backend server script

## npm_install.sh
Before every _npm install_ the command _electron-rebuild_ (node_modules/.bin/electron-rebuild) needs to be executed. This small script bundles the two commands.

__NOTE__: Before running this script, make sure that your Python2 virtual environment is activated.