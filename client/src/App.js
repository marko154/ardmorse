import "./App.css";
import { useState } from "react";
import morsemap from "./morsemap";
import Button from "./Button/Button";
import MorseCode from "./MorseCode/MorseCode";
const socket = new WebSocket("ws://localhost:8079");
const serverSocket = new WebSocket("ws://localhost:8080");

function App() {
	const [letters, setLetters] = useState([]);
	const [morseCode, setMorseCode] = useState([]);

	socket.addEventListener("message", (event) => {
		if (!(event.data in morsemap)) {
			setLetters(["pizda"]);
		} else {
			setLetters([...letters, morsemap[event.data]]);
			setMorseCode([...morseCode, event.data]);
		}
	});

	const handleAccept = () => {
		if (letters.length !== 0 && letters[0] !== "pizda")
			serverSocket.send(letters[letters.length - 1]);
	};

	const handleDiscard = () => {
		if (letters.length > 0)
			setLetters(letters.splice(0, letters.length - 1));
	};

	console.log(letters);
	return (
		<div className="App">
			<div className="state">
				<div className="word">
					<p> {letters.join(" ")} </p>
				</div>

				<div className="current-letter">
					<MorseCode morseCode={morseCode} />
					<p>
						{letters.length > 0
							? letters[letters.length - 1]
							: "Waiting"}
					</p>
				</div>
			</div>

			<Button onClick={handleAccept}>Accept</Button>
			<Button onClick={handleDiscard}>Discard</Button>

			<section>
				<p>{"dot < 0.5 seconds"}</p>
				<p>{"dash > 0.5 seconds"}</p>
			</section>
		</div>
	);
}

export default App;
