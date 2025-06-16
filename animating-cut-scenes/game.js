var player;

var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var startState = {}

startState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("speech1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fmove_me.png?1539354777104");
};

startState.create = function () {
    player = game.add.sprite(20, 215, "player");
    player.animations.add("walk", [1, 2, 3, 4], 6, true);
    player.scale.setTo(1.5);
    player.visible = false;

    // start animation
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(2000, this.playerMove, this);
    game.time.events.add(3000, this.speech1, this);
    game.time.events.add(4000, this.start, this);
};

startState.update = function () {
};

startState.playerShow = function () {
    player.visible = "true";
};

startState.playerMove = function () {
    var tween = game.add.tween(player);
    tween.to({x: 70, y: 215}, 1000, null, true, 0, 0, false);
    player.animations.play("walk");
};

startState.speech1 = function () {
    player.animations.stop();
    var speech1 = game.add.sprite(player.x - 70, player.y - 50, "speech1");
};

startState.start = function () {
    game.state.start("play");
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

// Assests here are from Kenny on Open Game Art 