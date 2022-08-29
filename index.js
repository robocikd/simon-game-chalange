const heading = $('#level-title');
const body = $('body');
const buttonsColors = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userPattern = [];

$(document).keydown(() => {
	if (gamePattern.length === 0) {
		addNextColor();
	}
});

function addNextColor() {
	const randomChosenColor = buttonsColors[nextColor()];
	gamePattern.push(randomChosenColor);
	$('#' + randomChosenColor)
		.fadeOut(50)
		.fadeIn(50);
	playASound(randomChosenColor);
	$(heading).text(`Level ${gamePattern.length}`);
}

function nextColor() {
	return Math.round(Math.random() * 3);
}

function playASound(color) {
	switch (color) {
		case 'green':
			const green = new Audio('./sounds/green.mp3');
			green.play();
			break;
		case 'red':
			const red = new Audio('./sounds/red.mp3');
			red.play();
			break;
		case 'yellow':
			const yellow = new Audio('./sounds/yellow.mp3');
			yellow.play();
			break;
		case 'blue':
			const blue = new Audio('./sounds/blue.mp3');
			blue.play();
			break;
		default:
			break;
	}
}

$('.btn').click((e) => {
	const buttonClicked = e.target.id;
	$(e.target).addClass('pressed');
	setTimeout(() => {
		$(e.target).removeClass('pressed');
	}, 100);
	userPattern.push(buttonClicked);
	checkAnswer(buttonClicked);
});

function checkAnswer(buttonClicked) {
	if (userPattern.length < gamePattern.length) {
		if (userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {
			playASound(buttonClicked);
		} else {
			endGame();
		}
	} else {
		if (userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {
			playASound(buttonClicked);
			userPattern.length = 0;
			setTimeout(() => {
				addNextColor();
			}, 1800);
		} else {
			endGame();
		}
	}
}

function endGame() {
	clearPatterns();
	flashAndSoundBody();
	$(heading).text('Game Over, Press Any Key to Restart');
}

function clearPatterns() {
	userPattern.length = 0;
	gamePattern.length = 0;
}

function flashAndSoundBody() {
	$(body).addClass('game-over');
	setTimeout(() => {
		$(body).removeClass('game-over');
	}, 200);
	const wrong = new Audio('./sounds/wrong.mp3');
	wrong.play();
}
