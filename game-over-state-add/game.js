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

    game.stage.backgroundColor = "#5699ab";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    platforms = game.add.group();
    coins = game.add.group();
    enemies = game.add.group();

    player = game.add.sprite(20, 100, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
      
    //NEW CODE FOR THIS EXAMPLE HERE
    // add an enemy to the screen 270 pixels in from left and 320 down from the top 
    var enemy1 = game.add.sprite(370, 320, "newenemy");
    enemy1.type = "spider";
  
    // add that enemy to the enemies group to that the overlap rule in update happens when you hit it
    enemies.add(enemy1);
  
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

    player.body.velocity.x = 0;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, coins, takeCoin, null, this);
    game.physics.arcade.overlap(player, enemies, hitHazard, null, this);

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

    if (coins.total === 0) {
        restart();
    }

};

var takeCoin = function (player, coin) {
    coin.kill();
};


// Function to restart the game
var restart = function () {
    game.state.start("play");
};

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

//THE HIT HAZARD CODE BELOW HAS BEEN CHANGED IN THIS EXAMPLE
var hitHazard = function () {
    player.kill();
    game.state.start("gameover");
};

// A NEW GAME OVER STATE IS DEFINED HERE
var gameOverState = {}

gameOverState.create = function (){
    this.gameoverText = game.add.text(10,10, "Game Over", "0:00");
    this.gameoverText.fill = "#ffffff";
    this.time.events.add(3000, this.restart, this)
};

gameOverState.restart = function(){
    game.state.start('play');
};

// Initialize the game at a certain size
game = new Phaser.Game(550, 400, Phaser.AUTO, "", "", false, false);

game.state.add("play", playState);
//THIS IS A NEW STATE OF GAME OVER ADDED HERE
game.state.add("gameover", gameOverState);
game.state.start("play");