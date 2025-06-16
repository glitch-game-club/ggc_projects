/* globals Phaser */
var game = new Phaser.Game(400, 300);

// List variables which can be easily changed by remixers to alter gameplay 
var gravity = 500;
var velocity_x = 200;
var velocity_y = 300;

// a list of key game variables at the beginning so preload, create and update functions can all access them.
var player; 
var platforms; 
var coins; 
var enemies 

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png?1539353650540", 22, 22);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.spritesheet("hazard", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Ffire2.png", 11, 27);

};


playState.create = function () {

    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, 275, "ground");
    ground.body.immovable = true;

    var platform1 = platforms.create(150, 220, "grass:4x1");
    platform1.body.immovable = true;

    var platform2 = platforms.create(290, 150, "grass:4x1");
    platform2.body.immovable = true;

    var platform3 = platforms.create(75, 100, "grass:4x1");
    platform3.body.immovable = true;

    coins = game.add.group();
    coins.enableBody = true;

    for (var i = 1; i < 4; i += 1) {
        var coin = game.add.sprite(i * 100, 0, "coin");
        coins.add(coin);
        coin.body.gravity.y = 200;
    }

    enemies = game.add.group();
    enemies.enableBody = true;
  
    var hazard1 = game.add.sprite(100, 250, "hazard");
    enemies.add(hazard1);    
    hazard1.animations.add("flicker", [0, 1], 6, true);
    hazard1.animations.play("flicker");

};
playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.overlap(player, coins, takeCoins);
    game.physics.arcade.overlap(player, enemies, hitHazard);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true) {
        player.body.velocity.x = -velocity_x;
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true) {
        player.body.velocity.x = velocity_x;
    }
    else {
        player.body.velocity.x = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true && player.body.touching.down === true) {
        player.body.velocity.y = -velocity_y;
    }
  
    if (coins.total === 0){
      game.state.restart();
    }
};

var takeCoins = function (player, coin) {
    coin.kill();
};

var hitHazard = function () {
    player.kill();
    game.state.restart();
};

// Function to restart the game from the beginning
var restart = function () {
    game.state.start("play");
};

//add the playState object to our game and start it

game.state.add("play", playState);
game.state.start("play");