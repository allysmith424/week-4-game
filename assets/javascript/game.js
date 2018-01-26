var characters = [

	{"name": "R2D2",
	"label": "r2d2", 
	"attackPower": 6,
	"counterAttackPower": 15,
	"life": 120},

	{"name": "C3PO",
	"label": "c3po",
	"attackPower": 10,
	"counterAttackPower": 20,
	"life": 100},

	{"name": "Jar Jar Binks",
	"label": "jarJar",
	"attackPower": 4,
	"counterAttackPower": 5,
	"life": 170},

	{"name": "Ewok",
	"label": "ewok",
	"attackPower": 8,
	"counterAttackPower": 10,
	"life": 140},	
	];


var attackerName, attackerAttackPower, attackerCounterAttackPower, attackerLife;

var defenderName, defenderAttackPower, defenderCounterAttackPower, defenderLife;

var attackerID, defenderID;

var characterChosen = false;

var deadEnemyCount = 0; 

var gameComplete = false;


function initializeGame() {
	$("#commentary").text("Start by choosing a character to battle opponents with");
	$("#attackBtn").attr("disabled", true);
	$("#r2d2Life").text(characters[0].life);
	$("#c3poLife").text(characters[1].life);
	$("#jarJarLife").text(characters[2].life);
	$("#ewokLife").text(characters[3].life);
	gameComplete = false;
	characterChosen = false;
	deadEnemyCount = 0;
	$("#attackBtn").hide();
};

function setAttacker(name) {
	for (var i = 0; i < characters.length; i++) {
		if (name === characters[i].label) {
			attackerName = characters[i].name;
			attackerAttackPower = characters[i].attackPower;
			attackerCounterAttackPower = characters[i].counterAttackPower;
			attackerLife = characters[i].life;
		}
	}
};

function setDefender(name) {
	for (var i = 0; i < characters.length; i++) {
		if (name === characters[i].label) {
			defenderName = characters[i].name;
			defenderAttackPower = characters[i].attackPower;
			defenderCounterAttackPower = characters[i].counterAttackPower;
			defenderLife = characters[i].life;
		}
	}
};

function updateAttackerLife(name) {
	if (name === "r2d2") {
		$("#r2d2Life").text(attackerLife);
	}
	else if (name === "c3po") {
		$("#c3poLife").text(attackerLife);
	}
	else if (name === "jarJar") {
		$("#jarJarLife").text(attackerLife);
	}
	else {
		$("#ewokLife").text(attackerLife);
	}
};

function updateDefenderLife(name) {
	if (name === "r2d2") {
		$("#r2d2Life").text(defenderLife);
	}
	else if (name === "c3po") {
		$("#c3poLife").text(defenderLife);
	}
	else if (name === "jarJar") {
		$("#jarJarLife").text(defenderLife);
	}
	else {
		$("#ewokLife").text(defenderLife);	
	}
};

function checkLives () {
	console.log(defenderLife);
	if (defenderLife > 0 && attackerLife > 0 && deadEnemyCount < 3) {
		$("#commentary").html("<p>You hit " + defenderName + " for " + attackerCounterAttackPower + "</p><p>His health is now " + defenderLife + "</p><p>Your health is now " + attackerLife + "</p>");
		attackerCounterAttackPower = attackerCounterAttackPower + attackerAttackPower;
	}
		
	else if (defenderLife <= 0 && attackerLife > 0 && deadEnemyCount < 3) {
		deadEnemyCount++;
		$("#defender").empty();
		$("#commentary").html("<p>You just beat " + defenderName + "</p><p>Choose another enemy</p>");
		console.log(deadEnemyCount);
		$("#attackBtn").attr("disabled", true);
	}

	updateAttackerLife(attackerID);
	updateDefenderLife(defenderID);

	checkIfAlive();
	checkIfWinner();

	};

function checkIfAlive() {
	if (attackerLife <=0) {
		$("#commentary").html("<p>You died</p><p>" + defenderName + " killed you</p>");
		$("#yourCharacter").empty();
		gameComplete = true;
	}

};

function checkIfWinner() {
	if (attackerLife > 0 && deadEnemyCount === 3) {
		$("#commentary").html("<p>Congratulations!</p><p>You've beaten all enemies</p><p>You and " + attackerName + " make a good team</p>");
		$("#attackBtn").attr("disabled", true);
		gameComplete = true;
	}
};


$(document).ready(function() {

$(".potentialCharacter").on("click", function() {
	if (gameComplete === false) {
		if (characterChosen === false && $("#enemies").is(":empty") && $("#defender").is(":empty") && deadEnemyCount === 0) {
			$(this).removeClass("potentialCharacter");
			attackerID = $(this).attr("id");
			setAttacker(attackerID);
			$(".potentialCharacter").each(
				function() {
					$("#enemies").append(this);
					$(this).addClass("potentialDefender");
				});
			characterChosen = true;
			$("#commentary").text("Now choose an opponent")
		}
		else {
			if ($("#defender").is(":empty") && attackerID !== $(this).attr("id")) {
				$("#defender").append(this);
				$(this).addClass("defender");
				$("#commentary").text("Press attack to battle")
				defenderID = $(this).attr("id");
				setDefender(defenderID);
				$("#attackBtn").show();
				$("#attackBtn").attr("disabled", false);
			}
		}
	}
});

$("#attackBtn").on("click", function() {

	if (gameComplete !== true) {

		defenderLife = defenderLife - attackerCounterAttackPower;
		attackerLife = attackerLife - defenderCounterAttackPower;
		checkLives();

	};	

});

initializeGame();

});


