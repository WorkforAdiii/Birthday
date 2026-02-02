@echo off
echo Setting up environment variables...
set "PATH=%PATH%;C:\Program Files\nodejs;C:\Users\MY PC\AppData\Roaming\npm"

echo Starting Birthday App...
yarn dev
pause
