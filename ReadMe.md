# Electron-python-boilerplate

A starting point for setting up an app with an Electron GUI and a Python backend.

## Setup of python virtual environments
It is recommended that you set up two virtual environments for this project. One Python2 and one Python3. You will need the Python2 environment to be able to install the Node.js module zerorpc, since zerorpc needs to be compiled. The compiler in Node.js only works with Python3.

## npm_install.sh
Before every _npm install_ the command _electron-rebuild_ (node_modules/.bin/electron-rebuild) needs to be executed. This small script bundles the two commands.

__NOTE__: Before running this script, make sure that your Python2 virtual environment is activated.