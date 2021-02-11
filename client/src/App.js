import "./App.scss";
import { useState } from "react";
import ClientSide from "./ClientSide/ClientSide";
import OtherSide from "./OtherSide/OtherSide";
import Button from "./Button/Button";
import MorseCodeMap from "./MorseCodeMap/MorseCodeMap";
import About from "./About/About";
import { BiSend } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import morsemap from "./morsemap";

const socket = new WebSocket("ws://localhost:8079");
const serverSocket = new WebSocket("ws://localhost:8080");

function App() {
	const [page, setPage] = useState("main");
	const [models, setModels] = useState({ client: null, other: null });
	// client
	const [letters, setLetters] = useState([]);
	const [morseCode, setMorseCode] = useState([]);
	const [alreadyDiscarded, setAlreadyDiscarded] = useState(false);
	const [isSending, setIsSending] = useState(false);

	// other guy
	const [receivedLetters, setReceivedLetters] = useState([]);
	const [receivedMorseCode, setMReceivedMorseCode] = useState([]);

	socket.addEventListener("message", (event) => {
		if (!(event.data in morsemap)) {
			setLetters(["pizda"]);
		} else {
			setLetters([...letters, morsemap[event.data]]);
			setMorseCode([...morseCode, event.data]);
			setAlreadyDiscarded(false);
		}
	});

	serverSocket.addEventListener("message", (event) => {
		console.log(event.data);
		setReceivedLetters([...receivedLetters, morsemap[event.data]]);
		setMReceivedMorseCode([...receivedMorseCode, event.data]);
	});

	const handleAccept = () => {
		if (letters.length !== 0 && letters[0] !== "pizda") {
			serverSocket.send(letters[letters.length - 1]);
		}
		setIsSending(true);
		setTimeout(() => {
			setIsSending(false);
		}, 1000);
	};

	const handleDiscard = () => {
		if (letters.length > 0 && !alreadyDiscarded) {
			setLetters(letters.splice(0, letters.length - 1));
			setMorseCode(morseCode.splice(0, morseCode.length - 1));
			setAlreadyDiscarded(true);
		}
	};

	const downloadCode = async () => {
		const res = await fetch("http://127.0.0.1:8080/code");
		const blob = await res.blob();
		let url = window.URL.createObjectURL(blob);
		let a = document.createElement("a");
		a.href = url;
		a.download = "client.js";
		a.click();
	};

	return page == "main" ? (
		<div className="App">
			<nav>
				<a
					href="https://github.com/bine-cadez/ardmorse"
					target="_blank"
				>
					<AiFillGithub />
				</a>
			</nav>
			<main>
				<ClientSide
					letters={letters}
					morseCode={morseCode}
					handleAccept={handleAccept}
					handleDiscard={handleDiscard}
					isSending={isSending}
					device={models.client}
				/>
				<div className="send-icon">
					<div className={isSending ? "sending" : ""}>
						<BiSend />
					</div>
				</div>
				<OtherSide
					letters={receivedLetters}
					morseCode={receivedMorseCode}
					device={models.other}
				/>
			</main>
			<section className="instructions">
				<p>{"Dot < 0.5 seconds"}</p>
				<p>{"Dash > 0.5 seconds"}</p>
				<Button onClick={downloadCode}>
					<HiCode /> Download Code
				</Button>
				<Button onClick={() => setPage("about")}>About</Button>
			</section>
			<MorseCodeMap />
		</div>
	) : (
		<About />
	);
}

export default App;
