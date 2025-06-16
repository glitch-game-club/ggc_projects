var game = new Phaser.Game(400, 300);

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var player; 

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?1540814965305");
    game.load.image("player1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero_stopped.png?1539353651204");
    game.load.image("player2", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fpirate-1.png?1540814832063");
    game.load.image("player3", "https://cdn.glitch.com/55f6e36e-afff-4c0b-92c3-37ae51a07904%2Fmario_original.png?1540843796139");
};

playState.create = function () {
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    game.add.sprite(0, 0, "background");
    player = game.add.sprite(0, 0, "player1");
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

};

playState.update = function () {
};

game.state.add("play", playState);
game.state.start("play");