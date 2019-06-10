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
				startingPlayer: player,
				turns : [],
			};

			///  Populate this turn
			let playerOrder = this.players.slice(0);
			if ( startingPlayerI != 0 ) {
				let moveToEnd = playerOrder.splice(0,startingPlayerI);
				playerOrder = playerOrder.concat(moveToEnd);
			}

			playerOrder.forEach((turnPlayer) => {
				round.turns.push(new Turn(turnPlayer));
			});

			this.roundState.push(round);
		})

		this.gameState = 'generated';
	}

	getPlayers() {
		return this.players;
	}

	getTurn() {
		if ( this.gameState != 'generated' ) { throw "Game is not Generated yet"; debugger; }

		return this.roundState[this.currentRound].turns[this.currentTurn];
	}

	endTurn() {
		
	}
}
