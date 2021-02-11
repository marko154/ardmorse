cd ..
cd server
start cmd.exe /k node index.js
"%windir%\system32\timeout.exe" /t 5 /nobreak
start cmd.exe /k ngrok http 8080


