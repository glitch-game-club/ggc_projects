// List the variables we will be using later
var player;

var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var startState = {}

startState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.audio("arrow_keys", "https://cdn.glitch.com/7cf198d4-87f7-4ff7-ac23-165a683d8a15%2Farrow_keys.mp3?1539602203986"); 
};

startState.create = function () {
    player = game.add.sprite(20, 215, "player");
    player.visible = false;
  
    this.arrowKeysAudio = game.add.audio("arrow_keys");

    // start animations
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(2000, this.speech1, this);
};

startState.update = function () {
};

startState.playerShow = function () {
    player.visible = true;
};

startState.speech1 = function () {
    this.arrowKeysAudio.play();
};


game.state.add("start", startState);
game.state.start("start");

// MAssests here are from Kenny on Open Game Art 