#! /bin/bash
NODE_MODULES_PATH="./node_modules"

# Rebuild electron
${NODE_MODULES_PATH}/.bin/electron-rebuild

# Install/Compile packages
npm install