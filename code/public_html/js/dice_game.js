'use strict';

import Game, * as G from './models/Game.js';
import * as T from './models/Turn.js';


let turn = null;
let game = null;

let unicodeDice = ['⚀','⚁','⚂','⚃','⚄','⚅'];

function init() {
	game = new Game(4);
	game.start();
	turn = game.getTurn();
	turn.runInitialRoll();
	updateUI();
}

function updateUI() {
	///  Main Game Panel
	$('#round_num').html(`Round ${game.currentRound + 1}`);

	let overallScoreStrs = [];
	let winningScore = 10000000;
	let winningPlayers = [];
	game.players.forEach((player) => {
		let currentScore = player.getCurrentOverallScore();
		overallScoreStrs.push(`<br/>${player.name}: ${currentScore}`);

		if ( currentScore < winningScore ) {
			winningScore = currentScore;
			winningPlayers = [player.name];
		}
		else if ( currentScore == winningScore ) {
			winningPlayers.push(player.name);
		}
	});
	$('.overall_player_scores').html(overallScoreStrs.join(''));
	$('#winner_names').html(winningPlayers.join(' <em>and</em> '));

	if ( game.gameState == 'over' ) {
		$('#game_board').hide(); $('#game_over_board').show();
	}
	else                            { $('#game_board').show(); $('#game_over_board').hide(); }


	///  Turn Panel
	$('#current_player_name').html(turn.player.name);

	let diceStrs = [];
	turn.keptDice.forEach((dice) => diceStrs.push(`<span class="dice">${unicodeDice[dice-1]}</span>`));
	$('#dice_kept').html(diceStrs.join(' '));

	diceStrs = [];
	turn.remainingDice.forEach((dice,i) => {
		if ( ! turn.toReRollDice[i] ) { diceStrs.push(`<a href="javascript:chooseDice(${i})" class="dice">${unicodeDice[dice-1]}</a>`); }
	});
	$('#dice_rolled').html(diceStrs.join(' '));

	diceStrs = [];
	turn.remainingDice.forEach((dice,i) => {
		if ( turn.toReRollDice[i] ) { diceStrs.push(`<a href="javascript:unChooseDice(${i})" class="dice"><strong>${unicodeDice[dice-1]}</strong></a>`); }
	});
	$('#dice_to_be_rerolled').html(diceStrs.join(' '));

	$('#current_score').html(turn.currentScore());
	$('#score_to_beat').html(game.getRound().scoreToBeat || ' - ');

	if ( turn.remainingDice.length == 1 ) { $('#roll-button').hide(); }
	else                                  { $('#roll-button').show(); }
}

function showError(message) {
	$('#temp-error-notify')[0].MaterialSnackbar.showSnackbar({
      message: message,
      timeout: 2000,
      actionHandler: null,
      actionText: null
    });
}


////////////////////////
///  Public Exposed UI functions

window.chooseDice = (diceI) => {
	turn.chooseDiceToReRoll(diceI);
	updateUI();
}


window.unChooseDice = (diceI) => {
	turn.unChooseDiceToReRoll(diceI);
	updateUI();
}

window.doReRoll = () => {
	try {
		turn.runReRoll();
	} catch (e) {
		if (e instanceof T.MustKeepAtLeastOneException        ) { showError("You must keep at least one dice!"); }
		else if (e instanceof T.EndTurnInsteadOfKeepingAllException) { showError("First Choose a Dice.  Then click the Roll button."); }
		else { throw e; }
	}

	updateUI();
}

window.endTurn = () => {
	try {
		game.endTurn();
		if ( game.gameState != 'over' ) {
			turn = game.getTurn();
			turn.runInitialRoll();
		}
	} catch (e) {
		if (e instanceof G.MustKeepAtLeastOneException        ) { showError("You must keep at least one dice!"); }
		// else if (e instanceof G.EndTurnInsteadOfKeepingAllException) { showError("First Choose a Dice.  Then click the Roll button."); }
		else { throw e; }
	}


	updateUI();
}

window.playGame = init;
