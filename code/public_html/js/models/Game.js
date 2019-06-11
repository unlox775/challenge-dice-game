'use strict';

import Turn from './Turn.js';
import Player from './Player.js';

export default class Game {
	constructor(numPlayers) {
		this.numPlayers = Math.floor(numPlayers);
		this.gameState = 'not-generated';

		this.players = [];
		for (let playerN = 0 ; playerN < this.numPlayers ; playerN++ ) {
			let player = new Player(`Player ${playerN + 1}`);
			this.players.push(player);
		}

		this.roundState = [];
		this.currentRound = 0;
		this.currentTurn = 0;
	}

	start() {
		/// choose Random First Player
		let startingPlayer = Math.floor(Math.random() * this.numPlayers); // 0-based
		if ( startingPlayer != 0 ) {
			let moveToEnd = this.players.splice(0,startingPlayer);
			this.players = this.players.concat(moveToEnd);
		}

		///  Now generate the flow for all rounds
		this.players.forEach((player, startingPlayerI) => {
			let round = {
				startingPlayer : player,
				scoreToBeat : false,
				turns : [],
			};

			///  Populate this turn
			let playerOrder = this.players.slice(0);
			if ( startingPlayerI != 0 ) {
				let moveToEnd = playerOrder.splice(0,startingPlayerI);
				playerOrder = playerOrder.concat(moveToEnd);
			}

			playerOrder.forEach((turnPlayer) => {
				let turn = new Turn(turnPlayer);
				round.turns.push(turn);
				turnPlayer.turns.push(turn);
			});

			this.roundState.push(round);
		})

		this.gameState = 'generated';
	}

	getPlayers() {
		return this.players;
	}

	getRound() {
		if ( this.gameState != 'generated' ) { throw "Game must be active and Generated.  Someone called when they should not have"; debugger; }

		return this.roundState[this.currentRound];
	}

	getTurn() {
		if ( this.gameState != 'generated' ) { throw "Game must be active and Generated.  Someone called when they should not have"; debugger; }

		return this.roundState[this.currentRound].turns[this.currentTurn];
	}

	endTurn() {
		if ( this.gameState != 'generated' ) { throw "Game must be active and Generated.  Someone called when they should not have"; debugger; }

		if ( this.currentTurn == (this.getRound().turns.length - 1) ) {
			return this.endRound();
		}

		// Update "Score to Beat"
		if ( this.getRound().scoreToBeat === false
			|| this.getRound().scoreToBeat > this.getTurn().currentScore()
			) {
			this.getRound().scoreToBeat = this.getTurn().currentScore();
		}

		// Advance the turn counter
		this.getTurn().isOver = true;
		this.currentTurn++;
	}

	endRound() {
		if ( this.gameState != 'generated' ) { throw "Game must be active and Generated.  Someone called when they should not have"; debugger; }

		// Sum up each Player's combined score
		this.getRound().turns.forEach((turn) => turn.player.combinedScore += turn.currentScore());

		///  End here, if this was the last round
		if ( this.currentRound == (this.roundState.length - 1) ) {
			return this.gameOver();
		}

		// Advance the round counter
		this.currentTurn = 0;
		this.currentRound++;
	}

	gameOver() {
		this.gameState = 'over';
		console.log(this);
	}
}

export class MustKeepAtLeastOneException { constructor() { } }
