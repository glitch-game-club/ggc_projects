var game = new Phaser.Game(400, 300);

// List variables which can be easily changed by remixers to alter gameplay 
var gravity = 500;
var velocity_x = 200;
var velocity_y = 300;

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var player; 
var platforms; 

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?1540814965305");
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
};

playState.create = function () {
    //a list of variables used only by the create function
    var ground;
    var platform1; 
    var platform2;
    var platform3; 
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    game.add.sprite(0, 0, "background");
    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5, 0.5);
    player.animations.add("stop", [0]);
    player.animations.add("run", [1, 2], 8, true); // 8fps looped
    player.animations.play("stop");

    platforms = game.add.group();
    platforms.enableBody = true;

    ground = platforms.create(0, 275, "ground");
    ground.body.immovable = true;

    platform1 = platforms.create(150, 220, "grass:4x1");
    //platform1.body.immovable = true;

    platform2 = platforms.create(250, 150, "grass:4x1");
    //platform2.body.immovable = true;

    platform3 = platforms.create(75, 100, "grass:4x1");
    //platform3.body.immovable = true;

};
playState.update = function () {
    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true) {
        player.body.velocity.x = -velocity_x;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true) {
        player.body.velocity.x = velocity_x;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true && player.body.touching.down === true) {
        player.body.velocity.y = -velocity_y;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true && player.body.touching.down === true) {
        player.body.velocity.y = -velocity_y;
    }
  
    if (player.body.velocity.x !== 0) {
        player.animations.play("run");
    }     
    else{
        player.animations.play("stop");
    }
    
    if (player.body.velocity.x < 0) {
        player.scale.x = -1;
    }
    else if (player.body.velocity.x > 0) {
        player.scale.x = 1;
    }
};

game.state.add("play", playState);
game.state.start("play");