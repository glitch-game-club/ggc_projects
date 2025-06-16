/* globals Phaser */
var game = new Phaser.Game(400, 300);

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var player; 

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero_stopped.png?1539353651204");
};

playState.create = function () {
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

};

playState.update = function () {
};

game.state.add("play", playState);
game.state.start("play");