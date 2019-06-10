'use strict';

export default class Turn {
	constructor(player) {
		this.player = player;
		this.keptDice = [1,2,3];
		this.remainingDice = [4,5];
		this.toReRollDice = [false,true];
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

	}

	runReRoll() {
		let keptCount = 0;
		this.toReRollDice.forEach((toReRoll) => { if (!toReRoll) { keptCount++; } });
		if ( keptCount == 0 ) { throw new MustKeepAtLeastOneException(); }

		console.log("Re-rolling...");
	}
}

export class MustKeepAtLeastOneException { constructor() { } }
