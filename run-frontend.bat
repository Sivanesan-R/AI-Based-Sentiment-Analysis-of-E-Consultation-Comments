@echo off
set "PROJECT_DIR=%~dp0"
set "NODE_DIR=%PROJECT_DIR%.tools\node-v24.14.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"

cd /d "%PROJECT_DIR%client"
npm.cmd run dev
