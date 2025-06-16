/* global Phaser */
// list some game elements put at the beginning so preload, create and update can access them.

// Things that change how the game works
var gravity = 900;
var velocity_x = 250;
var velocity_y = 500;

// Parts of the game
var game;
var player;
var coins;
var platforms;
var enemies;


// The following javascript object called playState contains all the active code for this simple game.
var playState = {};

playState.preload = function () {
  
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  
    // Here we preload the image assets - make more here http://piskelapp.com
    game.load.crossOrigin = "anonymous";
  
    game.load.image("player", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fplayer.png?1549457791680");  
    game.load.image("platform", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fwall.png?1549457791790");
    game.load.image("coin", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fcoin.png?1549457791846");

    game.load.image("newenemy", "https://cdn.glitch.com/05027ea3-25db-40c7-803e-2f710bf696a1%2Fhazard.png?1549457791750");

};

playState.create = function () {
    // Here we create the game, starting with the background colour
    game.stage.backgroundColor = "#5699ab";

    // These two lines add physics to the game world
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

     //create groups for the platforms, coins and enemies - what ever happens to the group happens
    // to all the members of the group

    platforms = game.add.group();
    coins = game.add.group();
    enemies = game.add.group();

    // add the main player to the game 70 pixels to the left and 100 pixels down from the top
    player = game.add.sprite(20, 100, "player");
    //add gravity to the player so that it falls down
    player.body.gravity.y = gravity;
    // don't let the player leave the screen area
    player.body.collideWorldBounds = true;

    // add an enemy to the screen 270 pixels in from tleft and 320 down from the top 
    var enemy1 = game.add.sprite(370, 320, "newenemy");
    // add that enemy to the enemies group to that the overlap rule in update happens when you hit it
    enemies.add(enemy1);
   
    // create a tween to add movement to that enemy
    var tween1 = game.add.tween(enemy1); 
    tween1.to({x:170, y: 320}, 2000, null, true, 0,-1,true);
  
    // Design the level. x = platform, o = coin, h = hazard.
    var level1 = [
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
        "    o            ",
        "xxxxxxxxxxxxxxxxx"
    ];  
  

        loadLevel(level1);
};

playState.update = function () {
    // Here we update the game 60 times per second - all code here is run all the time

    // stop the player if no key is pressed
    player.body.velocity.x = 0;

    // Make the player and the platforms collide , so player can't move through them
    game.physics.arcade.collide(player, platforms);

    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(player, coins, takeCoin, null, this);

    // Call the 'lose' function when the player touches the enemy
    game.physics.arcade.overlap(player, enemies, hitHazard, null, this);


    // add the controls for the cursor keys
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true) {
        player.body.velocity.x = -velocity_x;
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true) {
        player.body.velocity.x = velocity_x;
    }
    else {
        player.body.velocity.x = 0;
    }
    // Make the player jump if he is touching the ground
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true && player.body.touching.down === true) {
        player.body.velocity.y = -velocity_y;
    }

    if (coins.total === 0) {
        restart();
    }

};


var takeCoin = function (player, coin) {
    // Function to kill/disappear a coin if player touches it
    coin.kill();
};

var hitHazard = function (player, enemy) {
    // Function called when a player touches a hazard / enemy
    restart();
};

// Function to restart the game
var restart = function () {
    game.state.start("play");
};


// Initialize the game at a certain size
game = new Phaser.Game(550, 400, Phaser.AUTO, "", "", false, false);

//Add and start our play state
game.state.add("play", playState);
game.state.start("play");

function loadLevel (level) {
    // Create the level from the array of strings
    var i;
    var j;
    var wall;
    var coin;
    var enemy;
    for (i = 0; i < level.length; i = i + 1) {
        for (j = 0; j < level[i].length; j = j + 1) {
            if (level[i][j] === "x") { // Create a wall and add it to the 'platfrom' group
                wall = game.add.sprite(0 + 32 * j, 0 + 32 * i, "platform");
                wall.body.immovable = true;
                platforms.add(wall);
            } else if (level[i][j] === "o") { // Create a coin and add it to the 'coins' group
                coin = game.add.sprite(0 + 32 * j, 0 + 32 * i, "coin");
                coins.add(coin);
            }
        }
    }
}
