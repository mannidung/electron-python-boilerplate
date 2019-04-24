## Electron-python-boilerplate

A starting point for setting up an app with an Electron GUI and a Python backend.

# electron-rebuild.sh
Before every _npm install_ the command _electron-rebuild_ (node_modules/.bin/electron-rebuild) needs to be executed. However, for Node.js to be able to compile zeromq it needs a functioning installation of Python 2. This causes trouble if the python backend is written in Python3, and has a Python3 virtual environment.

This script temporarily replaces the _python_ command with a symlink to Python 2, allowing Node.js to compile zeromq.