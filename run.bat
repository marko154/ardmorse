cd server
start cmd.exe /k node client.js COM3
cd.. 
"%windir%\system32\timeout.exe" /t 5 /nobreak
cd client
start cmd.exe /k npm start

