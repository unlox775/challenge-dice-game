'use strict';

class Game {
	constructor(numPlayers) {
		this.numPlayers = Math.floor(numPlayers);

		this.players = [];
		for (let playerN = 0 ; playerN < this.numPlayers ; playerN++ ) {
			let player = {
				name: `Player ${playerN + 1}`,
			};
			this.players.push(player);
		}

		this.roundState = [];
	}

	start() {
		/// choose Random First Player
		let startingPlayer = Math.floor(Math.random() * this.numPlayers); // 0-based
		if ( startingPlayer != 0 ) {
			let moveToEnd = this.players.splice(0,startingPlayer);
			this.players = this.players.concat(moveToEnd);
		}

		///  Now generate the flow for all rounds
		this.players.forEach((player) => {
			let round = {
				player: player,
				turns : [],
			};
			this.roundState.push(round);
		})
	}


	getPlayers() {
		return this.players;
	}
}
export default Game;
