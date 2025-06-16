/* globals Phaser */
var game = new Phaser.Game(400, 300);

// List variables which can be easily changed by remixers to alter gameplay 
var gravity = 500;
var velocity_x = 200;
var velocity_y = 300;

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var player; 

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero_stopped.png");
};

playState.create = function () {
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;

};

playState.update = function () {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true) {
        player.body.velocity.x = -velocity_x;
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true) {
        player.body.velocity.x = velocity_x;
    }
    else {
        player.body.velocity.x = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true) {
        player.body.velocity.y = -velocity_y;
    }
};

game.state.add("play", playState);
game.state.start("play");