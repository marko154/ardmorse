import MorseCode from "../MorseCode/MorseCode";
import "./OtherSide.scss";

const OtherSide = ({ letters, morseCode }) => {
	return (
		<section className="other-side">
			<div className="device">Other device: Arduino Nano on COM5</div>
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
		</section>
	);
};

OtherSide.defaultProps = {
	letters: ["Waiting"],
	morseCode: ["110"],
};

export default OtherSide;
