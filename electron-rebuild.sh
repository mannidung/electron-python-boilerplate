#! /bin/bash

PYTHON2_EXEC_PATH = "/usr/bin/python2.7"
VIRTUAL_ENV_PATH="./venv"

# Move the existing python symlink to be able to create a new link to Python2.7
mv ${VIRTUAL_ENV_PATH}/bin/python ${VIRTUAL_ENV_PATH}/bin/python_temp
# Create temporary symlink to Python2 installation
ln -s ${PYTHON2_EXEC_PATH} ${VIRTUAL_ENV_PATH}/bin/python

# Rebuild electron
./node_modules/.bin/electron-rebuild

# Install/Compile packages
npm install

# Remove temporary symlink to Python2
rm ${VIRTUAL_ENV_PATH}/bin/python

# Reset to original symlink
#ln -s ${VIRTUAL_ENV_PATH}/bin/python3 ${VIRTUAL_ENV_PATH}/bin/python
mv ${VIRTUAL_ENV_PATH}/bin/python_temp ${VIRTUAL_ENV_PATH}/bin/python