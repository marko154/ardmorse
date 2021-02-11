import "./MorseCode.scss";

// animates a morse code letter
const MorseCode = ({ morseCode }) => {
	console.log(morseCode);
	return (
		<div className="morse-letter">
			{morseCode.length > 0 &&
				[...morseCode[morseCode.length - 1]].map((sign, i) =>
					sign === "1" ? (
						<div
							className="dash"
							key={i}
							style={{ animationDelay: `${i / 4}s` }}
						></div>
					) : (
						<div
							className="dot"
							key={i}
							style={{ animationDelay: `${i / 4}s` }}
						></div>
					)
				)}
		</div>
	);
};

export default MorseCode;
