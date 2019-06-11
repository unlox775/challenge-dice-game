'use strict';

class Player {
	constructor(name) {
		this.name = name;
		this.combinedScore = 0;
		this.turns = [];
	}

	getCurrentOverallScore() {
		let overallScore = 0;
		this.turns.forEach((turn) => overallScore = overallScore + turn.currentScore());
		return overallScore;
	}
}
export default Player;
