/* global Phaser */
"use strict";
// a list of our game elements put at the beginning
// so preload, create and update can access them.

// Things that change how the game works
var gravity = 500;
var playerMoveSpeed = 100;
var playerJumpSpeed = 300;

// Parts of the game
var game;
var player;
var coin;
var coins;
var walls;
var enemies;

// Keeping track of the player
var currentLevel;
var level1;
var level2;
var level3;
var score;

// Noises in the game
var splatNoise;
var winNoise;

var jumpTimer = 0;

// The following javascript object called playState contains all the active code for this simple game.
// You can add other states like, win, lose, start etc
var playState = {};
playState.init = function (levelToRun) {
    // Here reset score when play state starts
    score = 0;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    currentLevel = levelToRun;

};

playState.preload = function () {
    // Here we preload the image assets - make more here http://piskelapp.com
    game.load.crossOrigin = "anonymous";
  
    game.load.image("player", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fplayer.png?1549457791680");
  
  
    //game.load.spritesheet('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAPUlEQVRoge3SMQEAAAyDsPo3vcngCQpysIsbAAAAAAAAAAAAAAAAAEAOkPIJAQAAAAAAAAAAAAAAAABqwAOdyOO0PP/+wQAAAABJRU5ErkJggg==',32,32); 
  
    game.load.image("wall", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fwall.png?1549457791790");
    game.load.image("coin", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fcoin.png?1549457791846");
    game.load.image("enemy", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fhazard.png?1549457791750");
   
  
    // Here we preload the audio assets - make more here http://sfbgames.com/chiptone/
    game.load.audio("win", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/win.wav");
    game.load.audio("splat", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav");

};

playState.create = function () {
    // Here we create the game

    game.stage.backgroundColor = "#5699ab";

    // These two lines add physics to the game world
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

     //create groups for the walls, coins and enemies - what ever happens to the group happens
    // to all the members of the group

    walls = game.add.group();
    coins = game.add.group();
    enemies = game.add.group();

    // set up cursor keys to allow user input (the options are set in update)
    game.cursor = game.input.keyboard.createCursorKeys();

    // add the main player to the game 70 pixels to the left and 100 pixels down from the top
    player = game.add.sprite(20, 100, "player");
    //player.animations.add("move", [0, 1], 3, true);
    //player.animations.play("move");

    //add gravity to the player so that it falls down
    player.body.gravity.y = gravity;

    // don't let the player leave the screen area
    player.body.collideWorldBounds = true;


    // add audio to two variable ready to play later in other functions
    splatNoise = game.add.audio("splat");
    winNoise = game.add.audio("win");



    // Design the level. x = platform, o = coin, h = hazard.
    level1 = [
        "                 ",
        "                 ",
        "    o            ",
        "                 ",
        "  xxxxx          ",
        "                ",
        "                 ",
        "                o",
        "             xxxx",
        "                 ",
        "    o   h    h   ",
        "xxxxxxxxxxxxxxxxx"
    ];  
  
    level2 = [
        "                o",
        "                 ",
        "                 ",
        "                 ",
        "         o       ",
        "        xxxxx    ",
        "                 ",
        "     o          ",
        "   xxxx          ",
        "                 ",
        "    o        h   ",
        "xxxxxxxxxxxxxxxxx"
    ];

    level3 = [
        "                 ",
        "                o",
        "                 ",
        "      o h    xxxx",
        "      xxx        ",
        "    o            ",
        "                 ",
        "  xxxx          o",
        "     o    xxxx   ",
        "                 ",
        "    o   h    h   ",
        "xxxxxxxxxxxxxxxxx"
    ];

    if (!currentLevel || currentLevel === 1) {
        loadLevel(level1);
    } else if (currentLevel === 2) {
        loadLevel(level2);
    } else if (currentLevel === 3) {
        loadLevel(level3);
    }
};

playState.update = function () {
    // Here we update the game 60 times per second - all code here is run all the time

    // stop the player if no key is pressed
    player.body.velocity.x = 0;

    // Make the player and the walls collide , so player can't move through them
    game.physics.arcade.collide(player, walls);

    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(player, coins, playState.takeCoin, null, playState);

    // Call the 'lose' function when the player touches the enemy
    game.physics.arcade.overlap(player, enemies, playState.restart, null, playState);


    // add the controls for the cursor keys
    if (game.cursor.left.isDown) {
        player.body.velocity.x = -playerMoveSpeed;
    } else if (game.cursor.right.isDown) {
        player.body.velocity.x = playerMoveSpeed;
    } else {
        player.body.velocity.x = 0;
    }

    // Make the player jump if he is touching the ground
 if (game.input.keyboard.isDown(Phaser.Keyboard.UP))  {
        if (player.body.touching.down && jumpTimer === 0) {
            // jump is allowed to start
            jumpTimer = 1;
            player.body.velocity.y = -playerJumpSpeed;
        } else if (jumpTimer > 0 && jumpTimer < 31) {
            // keep jumping higher
            jumpTimer++;
            player.body.velocity.y = -playerJumpSpeed + (jumpTimer * 5);
        }   
    }  
    else {
        // jump button not being pressed, reset jump timer
        jumpTimer = 0;
      
      
    }
    if (coins.total === 0) {
        playState.nextlevel();
    }

};

playState.takeCoin = function (player, coin) {
    // Function to kill/disappear a coin if player touches it
    coin.kill();
    winNoise.play();

};

// Function to restart the game
playState.restart = function () {
    currentLevel = 1;
    game.state.start("main", true, false, currentLevel);
    splatNoise.play();

};

playState.nextlevel = function () {
    winNoise.play();
    if (!currentLevel) {
        currentLevel = 1;
    }
    currentLevel = currentLevel + 1;
    game.state.start("main", true, false, currentLevel);
};

// Initialize the game at a certain size
game = new Phaser.Game(550, 400, Phaser.AUTO, "", "main", false, false);

//Add and start our play state
game.state.add("main", playState);
game.state.start("main");

function loadLevel (level) {
    // Create the level from the array of strings
    var i;
    var j;
    var wall;
    var coin;
    var enemy;
    for (i = 0; i < level.length; i = i + 1) {
        for (j = 0; j < level[i].length; j = j + 1) {
            if (level[i][j] === "x") { // Create a wall and add it to the 'walls' group
                wall = game.add.sprite(0 + 32 * j, 0 + 32 * i, "wall");
                wall.body.immovable = true;
                walls.add(wall);
            } else if (level[i][j] === "o") { // Create a coin and add it to the 'coins' group
                coin = game.add.sprite(0 + 32 * j, 0 + 32 * i, "coin");
                coins.add(coin);
            } else if (level[i][j] === "h") { // Create a enemy and add it to the 'enemies' group
                enemy = game.add.sprite(0 + 32 * j, 0 + 32 * i, "enemy");
                enemies.add(enemy);
            }
        }
    }
}