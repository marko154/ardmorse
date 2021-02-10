import "./ClientSide.scss";
import Button from "../Button/Button";
import MorseCode from "../MorseCode/MorseCode";

const ClientSide = ({
	letters,
	morseCode,
	handleAccept,
	handleDiscard,
	isSending,
	device,
}) => {
	return (
		<div
			className="client-side"
			style={{
				border: isSending && "1px solid rgba(0, 110, 255, 0.5)",
				boxShadow:
					isSending && "rgba(149, 157, 165, 0.33) 0px 15px 33px",
			}}
		>
			<div className="device">
				{device ? `Your Device: ${device}` : "Waiting to connect"}
			</div>
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
