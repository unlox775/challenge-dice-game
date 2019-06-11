'use strict';

import Game from './models/Game.js';
import {MustKeepAtLeastOneException, EndTurnInsteadOfKeepingAllException} from './models/Turn.js';


let turn = null;
let game = null;

function init() {
	game = new Game(4);
	game.start();
	turn = game.getTurn();
	updateGameScoreBoard();
	turn.runInitialRoll();
	updateTurnPanel();
}

function updateGameScoreBoard() {
	$('#round_num').html(`Round ${game.currentRound + 1}`);
	console.log(turn);
	$('#whos_turn').html( turn.player.name );
}

function updateTurnPanel() {
	let diceStrs = [];
	turn.keptDice.forEach((dice) => diceStrs.push(`[${dice}]`));
	$('#dice_kept').html(diceStrs.join(' '));

	diceStrs = [];
	turn.remainingDice.forEach((dice,i) => {
		if ( turn.toReRollDice[i] ) {  }
		else                        { diceStrs.push(`<a href="javascript:chooseDice(${i})">[${dice}]</a>`); }
	});
	$('#dice_rolled').html(diceStrs.join(' '));

	diceStrs = [];
	turn.remainingDice.forEach((dice,i) => {
		if ( turn.toReRollDice[i] ) { diceStrs.push(`<a href="javascript:unChooseDice(${i})"><strong>[${dice}]</strong></a>`); }
		else                        {  }
	});
	$('#dice_to_be_rerolled').html(diceStrs.join(' '));

	$('#current_score').html(turn.currentScore());
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
	updateTurnPanel();
}

window.unChooseDice = (diceI) => {
	turn.unChooseDiceToReRoll(diceI);
	updateTurnPanel();
}

window.doReRoll = () => {
	try {
		turn.runReRoll();
	} catch (e) {
		if (e instanceof MustKeepAtLeastOneException        ) { showError("You must keep at least one dice!"); }
		if (e instanceof EndTurnInsteadOfKeepingAllException) { showError("First Choose a Dice.  Then click the Roll button."); }
		else { throw e; }
	}

	updateTurnPanel();
}


init();
