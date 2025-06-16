/* global Phaser */
"use strict";

var gravity = 600;
var playerMoveSpeed = 300;
var playerJumpSpeed = 700;

var game;
var player;
var coin;
var coins;
var walls;
var enemy;
var enemies;
var level;

game = new Phaser.Game(550, 400);

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

playState.init = function (levelToRun) {
    // Here reset score when play state starts
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
       level = levelToRun;
    };

playState.preload = function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  
     // These two lines add physics to the game world
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    // Here we preload the image assets - make more here http://piskelapp.com

    game.load.crossOrigin = "anonymous";
  
    game.load.image("player", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAKUlEQVRIie3NoQEAAAgDoP3/8ZKeoYFAJtPOhYjFYrFYLBaLxWKx+G+8cOTYhPAlQ2YAAAAASUVORK5CYII=");
    
    game.load.image("coin", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAK0lEQVRIie3NoQEAAAQAMMH/xVO+4gzCwvKiK+dCiMVisVgsFovFYrH4b7wNhlLxXKUgugAAAABJRU5ErkJggg==");
    game.load.image("enemy", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAKUlEQVRIie3NoQEAAAgDoP3/8ZKeoYFAJtPOhYjFYrFYLBaLxWKx+G+8cOTYhPAlQ2YAAAAASUVORK5CYII=");
  
    game.load.image("floor", "https://cdn.glitch.com/de1e5fbc-1ddc-408a-b2ed-5e88b24f69ec%2Fplat550.png?1549104504094");

    };

playState.create = function () {

    game.stage.backgroundColor = "#5699ab";

    walls = game.add.group();
    coins = game.add.group();
    enemies = game.add.group();

    game.cursor = game.input.keyboard.createCursorKeys();

  
    this.timeLimit = 5;
    this.timeText = game.add.text(10, 10, "00:00");
    this.timeText.fill = "#000000";
    this.timer = game.time.events.loop(1000, tick, this);
  
    if (level ==1 || !level) {
      level1(); 
    }
    else if (level ==2){
      level2();
    }
    else {
      level1();
    } 
};

var level1 = function(){
    player = game.add.sprite(20, 100, "player");

    var coin = game.add.sprite(150, 100, "coin");
    coins.add(coin);    

    var coin2 = game.add.sprite(250, 200, "coin");
    coins.add(coin2);

    var enemy = game.add.sprite(350, 300, "enemy");
    enemies.add(enemy); 
  
    var floor = game.add.sprite(0, 360, "floor");
    floor.body.immovable = true;
    walls.add(floor);    

    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
};


var level2 = function(){
    player = game.add.sprite(20, 100, "player");

    var coin = game.add.sprite(150, 100, "coin");
    coins.add(coin);    

//    var coin2 = game.add.sprite(250, 200, "coin");
  //  coins.add(coin2);

    var enemy = game.add.sprite(350, 300, "enemy");
    enemies.add(enemy); 
  
    var floor = game.add.sprite(0, 360, "floor");
    floor.body.immovable = true;
    walls.add(floor);    

    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
};


playState.update = function () {
    // Here we update the game 60 times per second - all code here is run all the time

    // stop the player if no key is pressed
    player.body.velocity.x = 0;

    // Make the player and the walls collide , so player can't move through them
    game.physics.arcade.collide(player, walls);

    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(player, coins, takeCoin, null, this);

    // Call the 'lose' function when the player touches the enemy
    game.physics.arcade.overlap(player, enemies, gameover, null, this);


    // add the controls for the cursor keys
    if (game.cursor.left.isDown) {
        player.body.velocity.x = -playerMoveSpeed;
    } else if (game.cursor.right.isDown) {
        player.body.velocity.x = playerMoveSpeed;
    } else {
        player.body.velocity.x = 0;
    }

    // Make the player jump if he is touching the ground
    if (game.cursor.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -playerJumpSpeed;
    }

    if (coins.total === 0) {
        nextlevel();
    }

};


var tick = function () {
    this.timeLimit--;
    var minutes = Math.floor(this.timeLimit / 60);
    var seconds = this.timeLimit - (minutes * 60);
    var timeString = addZeros(minutes) + ":" + addZeros(seconds);
    this.timeText.text = timeString;
    if (this.timeLimit === 0) {
        game.state.start("gameover");
    }
};

var addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

var takeCoin = function (player, coin) {
    coin.kill();
};

// Function to restart the game
var gameover = function () {
    game.state.start("gameover");

};

var restart = function () {
    game.state.start("play");
};

var nextlevel = function () {
    if (!level) level = 1;
    level = level + 1
    game.state.start("play", true, false, level);
}

var gameoverState = {};
gameoverState.create = function () {
    var gameoverText = game.add.text(10,10, "Game Over", "0:00");
    gameoverText.fill = "#ffffff";
    game.time.events.add(3000, restart, this);
};


var youwinState = {};
youwinState.create = function () {
    var youwinText = game.add.text(10,10, "You Win", "0:00");
    youwinText.fill = "#ffffff";
    game.time.events.add(3000, restart, this);
};


//Add and start our play state

game.state.add("play", playState);
game.state.add("start", startState);
game.state.add("gameover", gameoverState);
game.state.add("youwin", youwinState);
game.state.start("start");

