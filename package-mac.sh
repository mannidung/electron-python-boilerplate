#! /bin/bash

# Run pyinstaller to package the server
# Create a one file bundle (with -F)
pyinstaller -F ./server/server.py --distpath ./python_build

cd ..
./node_modules/.bin/electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds --ignore=^/server --ignore=^/npm_install\\.sh --ignore=^/package-mac\\.sh --ignore=^/README\\.md --ignore=^/venv_python2.7 --ignore=^/venv_python3

# --icon=assets/icons/mac/icon.icns