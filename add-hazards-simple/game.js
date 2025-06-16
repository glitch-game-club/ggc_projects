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
var coinSound;
var enemies 
var enemysound;

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?1540814965305");
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png?1539353650540", 22, 22);
    game.load.audio("coinwav", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_1.wav?1537903834353");
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.spritesheet("hazard", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Ffire2.png?1539358187974", 11, 27);
    game.load.audio("enemywav", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fsplat.wav?1539513041296");

};


playState.create = function () {
    //list the variables used only by the create function
    var ground;
    var platform1; 
    var platform2;
    var platform3; 
    var tween1; 

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
    platform1.body.immovable = true;

    platform2 = platforms.create(290, 150, "grass:4x1");
    platform2.body.immovable = true;

    platform3 = platforms.create(75, 100, "grass:4x1");
    platform3.body.immovable = true;

    coins = game.add.group();
    coins.enableBody = true;

    for (var i = 1; i < 4; i += 1) {
        var coin = game.add.sprite(i * 100, 0, "coin");
        coins.add(coin);
        coin.body.gravity.y = 200;
        coin.animations.add("rotate", [0, 1, 2, 1], 6, true);
        coin.animations.play("rotate");
    }

    coinSound = game.add.audio("coinwav");

    enemies = game.add.group();
    enemies.enableBody = true;
    var hazard1 = game.add.sprite(100, 250, "hazard");
    enemies.add(hazard1);    
    hazard1.animations.add("flicker", [0, 1], 6, true);
    hazard1.animations.play("flicker");

    enemysound = game.add.audio("enemywav");

    var enemy1 = game.add.sprite(270, 115, "enemy");
    enemies.add(enemy1);
    enemy1.animations.add("crawl", [0, 1, 2], 8, true);
    enemy1.animations.play("crawl");

    var tween1 = game.add.tween(enemy1);
    tween1.to({x: 350, y: 115}, 2000, null, true, 0, -1, true);
};
playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.overlap(player, coins, collectCoins);
    game.physics.arcade.overlap(player, enemies, hitEnemy);

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
  
    if (coins.total ===0){
    game.state.restart("play");
    }
      
};

var collectCoins = function (player, coin) {
    coin.kill();
    coinSound.play();
};

var hitEnemy = function () {
    player.kill();
    enemysound.play();
    game.state.restart();
};

var checkAlive = function (group) {
    var count_alive = 0, i;
    for (i = 0; i < group.children.length; i += 1) {
        if (group.children[i].alive === true) {
            count_alive += 1;
        }
    }
    if (count_alive === 0) {
        game.state.restart("play");
    }
};

//add the playState object to our game and start it

game.state.add("play", playState);
game.state.start("play");