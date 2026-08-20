@echo off
set "PROJECT_DIR=%~dp0"
set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"

cd /d "%PROJECT_DIR%backend"
"%PYTHON_EXE%" App.py
