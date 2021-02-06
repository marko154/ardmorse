import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import morsemap from "./morsemap";
const socket = new WebSocket('ws://localhost:8079');
const serverSocket = new WebSocket('ws://localhost:8080');



function App() {
   const [state, setState] = useState([]);
   socket.addEventListener('message', function (event) {
  if (!(event.data in morsemap)) {
    setState(["pizda"]);
  }
  else {
    setState([...state, morsemap[event.data]]);

  }
  });

const handleAccept = (event) => {
  if (state.length !== 0 && state[0] !=="pizda")
  serverSocket.send(state[state.length - 1]);
}

console.log(state);
  return (
    <div className="App">
      <div className="text" style={{width:"50px", height:"50px",marginLeft:"50%",transform:"translateX(-50%)"}}>
          <p> {state.join(" ")} </p>
      </div>
        <button onClick={handleAccept}>accept</button>
        <button>discard</button>
        <hr></hr>
        <p>{"everything under 0.5 seconds is registered as dot"}</p>
        <p>{"everything over 0.5 seconds is registered as dash"}</p>
    </div>
  );
}

export default App;
