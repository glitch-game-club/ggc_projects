/* globals Phaser */
var player;
var platforms;
var coins;
var enemies;
var currentLevel = 1;
var leveldata;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png?1539353650540", 22, 22);

};

playState.create = function () {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    game.add.sprite(0, 0, "background");
 
    player = game.add.sprite(100, 200, "player");
    player.body.gravity.y = 500;
  
    player.body.collideWorldBounds = true;
    
    platforms = game.add.group();
    platforms.enableBody = true;
  
    coins = game.add.group();
    coins.enableBody = true;

    enemies = game.add.group();
    enemies.enableBody = true;
  
    if (!currentLevel ||  currentLevel ===1){
      loadLevelOne();
    }
    else if (currentLevel === 2 ){
      loadLevelTwo();
    } 

  
};

var loadLevelOne = function(){

    var ground = game.add.sprite(0,325,"ground");
    ground.body.immovable = true;
    platforms.add(ground);
  
    var platform1 = game.add.sprite(150,245,"grass:4x1");
    platform1.body.immovable = true;
    platforms.add(platform1);
  
    var platform2 = game.add.sprite(250,100,"grass:4x1");
    platform2.body.immovable = true;
    platforms.add(platform2);
  
    var enemy1 = game.add.sprite(200,290,"enemy"); 
    enemies.add(enemy1);
  
    var coin1 = game.add.sprite(400,275,"coin"); 
    coins.add(coin1);  
  
};

var loadLevelTwo = function(){
  
    var ground = game.add.sprite(0,325,"ground");
    ground.body.immovable = true;
    platforms.add(ground);
  
    var platform1 = game.add.sprite(150,245,"grass:4x1");
    platform1.body.immovable = true;
    platforms.add(platform1);
  
    var platform2 = game.add.sprite(250,160,"grass:4x1");
    platform2.body.immovable = true;
    platforms.add(platform2);  
  
    var platform2 = game.add.sprite(375,120,"grass:4x1");
    platform2.body.immovable = true;
    platforms.add(platform2);  
  
    var enemy1 = game.add.sprite(290,125,"enemy");
    enemies.add(enemy1);
  
    var coin1 = game.add.sprite(400,55,"coin");
    coins.add(coin1);  
    
};

playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, enemies, hitHazard);
    game.physics.arcade.overlap(player, coins, collectCoins);

  
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.body.velocity.x = -300
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = 300;
    }
    else {
      player.body.velocity.x = 0;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down === true) {
      player.body.velocity.y = -300
    }

    checkAlive(coins);
};

var collectCoins = function (player, coin) {
    coin.kill();
};

var checkAlive = function (group) {
    var count_alive = 0;
    for (var i = 0; i < group.children.length; i++) {
        if (group.children[i].alive == true) {
            count_alive++;
        }
    }
  
    if (count_alive === 0 && currentLevel < 3) {
        currentLevel = currentLevel + 1
        game.state.start("play", true, false, currentLevel);
    } else if (count_alive === 0) {
        currentLevel = 1;
        game.state.start("play", true, false, currentLevel);
    }
};

var hitHazard = function (player, enemy) {
    // Function called when a player touches a hazard / enemy
    restart();
};

// Function to restart the game
var restart = function () {
    currentLevel = 1;
    game.state.start("play", true, false, currentLevel);
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/