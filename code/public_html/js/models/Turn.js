'use strict';

export default class Turn {
	constructor(player) {
		this.player = player;
		this.keptDice = [];
		this.remainingDice = [];
		this.toReRollDice = [];
	}

	chooseDiceToReRoll(diceI){
		if ( this.toReRollDice.length <= diceI ) { throw "reference to non-existent "; }
		this.toReRollDice[diceI] = true;
	}
	unChooseDiceToReRoll(diceI){
		if ( this.toReRollDice.length <= diceI ) { throw "reference to non-existent dice"; }
		this.toReRollDice[diceI] = false;
	}

	runInitialRoll() {
		for (let i = 1; i <= 5 ; i++) {
			this.remainingDice.push(randomRoll());
			this.toReRollDice.push(false);
		}
	}

	runReRoll() {
		let keptCount = 0;
		this.toReRollDice.forEach((toReRoll) => { if (!toReRoll) { keptCount++; } });
		if ( keptCount == 0 ) { throw new MustKeepAtLeastOneException(); }
		if ( keptCount == this.toReRollDice.length ) { throw new EndTurnInsteadOfKeepingAllException(); }

		///  Move all the kept dice
		for (let diceI = this.toReRollDice.length -1 ; diceI >= 0; diceI--) {
			if (!this.toReRollDice[diceI]) {
				this.keptDice.push(this.remainingDice[diceI]);
				this.remainingDice.splice(diceI,1);
				this.toReRollDice.splice(diceI,1);
			}
		}

		///  Roll the remainingDice
		this.remainingDice.forEach((v,diceI) => {
			this.remainingDice[diceI] = randomRoll();
			this.toReRollDice[diceI] = false;
		});
	}

	currentScore() {
		let score = 0;
		this.keptDice.concat(this.remainingDice).forEach((die) => {
			if ( die == 4 ) { score = score + 0; }
			else            { score = score + die; }
		});
		return score;
	}
}

const randomRoll = () => {
	return Math.floor(Math.random() * 6) + 1;
}

export class MustKeepAtLeastOneException { constructor() { } }
export class EndTurnInsteadOfKeepingAllException { constructor() { } }
