import "./ClientSide.scss";
import Button from "../Button/Button";
import MorseCode from "../MorseCode/MorseCode";

const ClientSide = ({ letters, morseCode, handleAccept, handleDiscard }) => {
	return (
		<div className="client-side">
			<div className="device">Your Device: Arduino Uno on COM3</div>
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
		</div>
	);
};

export default ClientSide;
