<!doctype html>
<!--
  Material Design Lite
  Copyright 2015 Google Inc. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License
-->
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
	<title>Dave Buchanan - Dice Game Coding Challenge</title>

	<!-- Add to homescreen for Chrome on Android -->
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="icon" sizes="192x192" href="images/android-desktop.png">

	<!-- Add to homescreen for Safari on iOS -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-title" content="Material Design Lite">
	<link rel="apple-touch-icon-precomposed" href="images/ios-desktop.png">

	<!-- Tile icon for Win8 (144x144 + tile color) -->
	<meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
	<meta name="msapplication-TileColor" content="#3372DF">

	<link rel="shortcut icon" href="images/favicon.png">

	<!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
-->

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.cyan-light_blue.min.css">
<link rel="stylesheet" href="styles.css">
<style>
	#view-source {
		position: fixed;
		display: block;
		right: 0;
		bottom: 0;
		margin-right: 40px;
		margin-bottom: 40px;
		z-index: 900;
	}
</style>
</head>
<body>
	<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
		<header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
			<div class="mdl-layout__header-row">
				<span class="mdl-layout-title">Dave Buchanan - Dice Game Coding Challenge</span>
			</div>
		</header>
		<div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
			<header class="demo-drawer-header">
				<img src="images/user.jpg" class="demo-avatar">
				<div class="demo-avatar-dropdown">
					<span>devs@medbridge.com</span>
					<div class="mdl-layout-spacer"></div>
					<button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
						<i class="material-icons" role="presentation">arrow_drop_down</i>
						<span class="visuallyhidden">Accounts</span>
					</button>
					<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
						<li class="mdl-menu__item"><a href="https://github.com/unlox775/">Dave's Github</a></li>
						<li class="mdl-menu__item"><a href="https://github.com/unlox775/challenge-dice-game">This Code Repository</a></li>
					</ul>
				</div>
			</header>
			<nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
				<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
			</nav>
		</div>
		<main class="mdl-layout__content mdl-color--grey-100">
			<div class="mdl-grid demo-content">
				<div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
					<h5>
						Dice Game
						<button onclick="playGame()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">New Game</button>
					</h5>

					<div class="game_board" style="display: none">
						<p>
							<strong>Round:</strong>
							<span id="round_num"> - </span>
						</p>
						<p>
							<strong>This Round Scores:</strong>
							<span class="round_player_scores"> - </span>
						</p>

						<h5>Your Dice: <span id="current_player_name"></span></h5>
						<p>
							<strong>Dice Kept:</strong>
							<span id="dice_kept"> - </span>
						</p>
						<p>
							<strong>To Be Kept:</strong>
							<span id="dice_rolled"> - </span>
							&nbsp;
							&nbsp;
							&nbsp;
							&nbsp;
							<strong>To be Re-Rolled:</strong>
							<span id="dice_to_be_rerolled"> - </span>
							<br/><em>(click the dice to change to roll/not-roll)</em>
						</p>
						<p>
							<strong>Current Score:</strong>
							<span id="current_score"> - </span>
							&nbsp;
							&nbsp;
							&nbsp;
							&nbsp;
							<strong>Score to Beat, this round:</strong>
							<span id="score_to_beat"> - </span>
						</p>
						<p>
							<button id="roll-button" onclick="doReRoll()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Roll!</button>
							<button onclick="endTurn()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Keep It! End My Turn</button>
						</p>          	
					</div>

					<div class="game_over_board" style="display: none">
						<h5>Game Over!</h5>

						<p>
							<strong>Final Player Scores:</strong>
							<span class="overall_player_scores"> - </span>
						</p>

						<h2>Winner: <span id="winner_names"></span></h2>
					</div>
				</div>
				<div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
					<div class="game_board demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop" style="display: none">
						<div class="mdl-card__supporting-text mdl-color-text--grey-600">
							<h5>Overall Player Scores:</h5>
							<p class="overall_player_scores"> - </p>
						</div>
					</div>
					<div class="game_board demo-separator mdl-cell--1-col" style="display: none"></div>
					<div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
						<div class="mdl-card__supporting-text mdl-color-text--grey-600">
							<h5>Game Rules:</h5>
							<ol style="font-size: 8pt">
								<li>The player rolls all five dice, then must keep at least one dice but may keep more at her discretion (She can stop on her first roll if she so wishes).</li>
								<li>Those dice which are not kept are rolled again and each round she must keep at least one more until all the dice are out.</li>
								<li>Once each player has rolled the player who scored the lowest wins.</li>
								<li>Repeat for three more rounds in succession so that the next person starts rolling first (at the end each player will have started).</li>
								<li>After all four rounds have been completed the player with the lowest combined score wins.</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="module">import '/js/dice_game.js';</script>

	<div id="temp-error-notify" class="mdl-js-snackbar mdl-snackbar">
		<div class="mdl-snackbar__text"></div>
		<button class="mdl-snackbar__action" type="button"></button>
	</div>
	<!-- <script type="module" src="/js/dice_game.js"></script> -->
</body>
</html>


