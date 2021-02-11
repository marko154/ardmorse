# Arduino Communication Device
## Docs
1. Two devices:
     - Connect arduino and edit run_files/run insert the port your arduino is connected on (eg. COM3)
     - On one of the devices start MorseServer and edit client/src/app.js with ip ngrok gives you (ws:{copied ip})
     - Start MorseCoder on both computers
     - Press and hold powerOn button on arduino until PowerLED starts glowing
     - When intervalLED is on press quickly for a dot or perform a long press for a dash
     - After the input of dots and dashes simply stop pressing and wait for arduino to reset itself and repeat
     - If there is no input dont worry the program will just skip
     - When you complete a character it will pop up in webapp, where you can accept or discard it
2. Three devices:
     - Appoint one to be the server
     - Perform the same steps, except perform the second step on the server
## Architecture:
![alt text](https://github.com/bine-cadez/ardmorse/blob/main/client/public/readme.png?raw=true)
1. **c++**
     - Arduino is coded in c++
     - It reads button presses and sends 1 and 0 to node js client
2. **node.js**
     - It takes messages from arduino by serial port
     - Sends the messages to front end which is coded in react js
     - Server is also coded in node and handles inter-client messages
3. **react.js**
     - It takes messages and converts them to characters
     - Handles the styling of UI
     - sends the messages to server
4. **ngrok**
      - Puts server online and provides ip, to which react can connect to
