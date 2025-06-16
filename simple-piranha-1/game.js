/* globals Phaser */
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
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png?1539353650540", 22, 22);

};

playState.create = function () {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
 
    playState.player = game.add.sprite(100, 200, "player");
    player.body.gravity.y = 500;
  
    player.body.collideWorldBounds = true;
    
    platforms = game.add.group();
    platforms.enableBody = true;
  
    coins = game.add.group();
    coins.enableBody = true;

    enemies = game.add.group();
    enemies.enableBody = true;
  
    var level1 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:4x1","x":250,"y":160},{"image":"grass:4x1","x":75,"y":100}],
                 "coins":[{"image":"coin","x":0,"y":225},{"image":"coin","x":150,"y":200}] };
  
    var level2 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:4x1","x":250,"y":160},{"image":"grass:4x1","x":375,"y":120}],
                 "coins":[{"image":"coin","x":300,"y":225},{"image":"coin","x":450,"y":200}] };  
    
    if (!currentLevel ||  currentLevel ===1){
      leveldata = level1;
    }
    else if (currentLevel === 2 ){
      leveldata = level2;
    } 
  
    for (var i = 0; i < leveldata.platforms.length; i++) {
      var platform = platforms.create(leveldata.platforms[i].x, leveldata.platforms[i].y, leveldata.platforms[i].image);
      platform.body.immovable = true;
      var coin =coins.create(leveldata.coins[i].x, leveldata.coins[i].y, leveldata.coins[i].image);
    }  
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
  
    if (count_alive === 0 && currentLevel < 2) {
        currentLevel = currentLevel + 1
        game.state.start("play", true, false, currentLevel);
    } else if (count_alive === 0 && currentLevel === 2) {
        //normally game over but loop back here to start 
        currentLevel = 1
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