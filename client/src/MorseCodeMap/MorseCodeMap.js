import morseMap from "../morsemap";
import "./MorseCodeMap.scss";

const morseCodeMap = Object.keys(morseMap).reduce(
	(acc, key) => [...acc, [key, morseMap[key]]],
	[]
);

const MorseCodeMap = () => (
	<div className="morse-code-map">
		{morseCodeMap.map(([code, letter]) => (
			<div className="line" key={letter}>
				<div className="code">
					{[...code].map((sign, i) =>
						sign === "1" ? (
							<div className="dash" key={i}></div>
						) : (
							<div className="dot" key={i}></div>
						)
					)}
				</div>
				<div className="letter">{letter}</div>
			</div>
		))}
	</div>
);

export default MorseCodeMap;
