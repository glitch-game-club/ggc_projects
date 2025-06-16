// List the variables we will be using later
var player;

var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var startState = {}

startState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("s1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fmove_me.png?1539354777104");
};

startState.create = function () {

};

startState.update = function () {
};


var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fbackground.png?1539353652001");
};

playState.create = function () {
    var background = game.add.sprite(0, 0, "background");
};

game.state.add("play", playState);
game.state.add("start", startState);
game.state.start("start");

// MAssests here are from Kenny on Open Game Art 