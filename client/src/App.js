import "./App.scss";
import { useState } from "react";
import ClientSide from "./ClientSide/ClientSide";
import OtherSide from "./OtherSide/OtherSide";
import { BiSend } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import morsemap from "./morsemap";
import Button from "./Button/Button";

const socket = new WebSocket("ws://localhost:8079");
const serverSocket = new WebSocket("ws://localhost:8080");

function App() {
	// client
	const [letters, setLetters] = useState([]);
	const [morseCode, setMorseCode] = useState([]);

	// other guy
	const [receivedLetters, setReceivedLetters] = useState([]);
	const [receivedMorseCode, setMReceivedMorseCode] = useState([]);

	socket.addEventListener("message", (event) => {
		if (!(event.data in morsemap)) {
			setLetters(["pizda"]);
		} else {
			setLetters([...letters, morsemap[event.data]]);
			setMorseCode([...morseCode, event.data]);
		}
	});

	serverSocket.addEventListener("message", (event) => {
		console.log(event);
	});

	const handleAccept = () => {
		if (letters.length !== 0 && letters[0] !== "pizda")
			serverSocket.send(letters[letters.length - 1]);
	};

	const handleDiscard = () => {
		if (letters.length > 0) {
			setLetters(letters.splice(0, letters.length - 1));
			setMorseCode(morseCode.splice(0, morseCode.length - 1));
		}
	};

	return (
		<div className="App">
			<main>
				<ClientSide
					letters={letters}
					morseCode={morseCode}
					handleAccept={handleAccept}
					handleDiscard={handleDiscard}
				/>
				<div className="send-icon">
					<BiSend />
				</div>
				<OtherSide />
			</main>
			<section className="instructions">
				<p>{"Dot < 0.5 seconds"}</p>
				<p>{"Dash > 0.5 seconds"}</p>
				<Button>
					<HiCode /> Download Code
				</Button>
				<Button>About</Button>
			</section>
		</div>
	);
}

export default App;
