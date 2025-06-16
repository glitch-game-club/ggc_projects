var player;
var platforms;
var coins;
var wlevel = 1;
var leveldata;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};

//playState.init = function (wlevel) {
  //  wlevel = wlevel;
//};

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
    
    var level1 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:4x1","x":250,"y":160},{"image":"grass:4x1","x":75,"y":100}],
                 "coins":[{"image":"coin","x":0,"y":225},{"image":"coin","x":150,"y":200}]                 };
    var level2 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":50,"y":240},{"image":"grass:4x1","x":300,"y":160},{"image":"grass:4x1","x":75,"y":100}],
                 "coins":[{"image":"coin","x":200,"y":225},{"image":"coin","x":350,"y":100}]};
    var level3 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":250,"y":240},{"image":"grass:4x1","x":300,"y":160},{"image":"grass:4x1","x":75,"y":100}],
                 "coins":[{"image":"coin","x":330,"y":125},{"image":"coin","x":100,"y":50}]}; 

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

    if (!wlevel ||  wlevel ===1){
      leveldata = level1;
    }
    else if (wlevel === 2 ){
      leveldata = level2;
    } 
    else if (wlevel === 3 ){
      leveldata = level3;
    }
  
    for (var i = 0; i < leveldata.platforms.length; i++) {
        var platform = platforms.create(leveldata.platforms[i].x, leveldata.platforms[i].y, leveldata.platforms[i].image);
        platform.body.immovable = true;
    }
  
    for (var i = 0; i < leveldata.coins.length; i++) {
        var coin = coins.create(leveldata.coins[i].x, leveldata.coins[i].y, leveldata.coins[i].image);
    }
  
};

playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, coins, playState.collectCoins);

  
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

    playState.checkAlive(coins);
};

playState.collectCoins = function (player, coin) {
    coin.kill();
};

playState.checkAlive = function (group) {
    var count_alive = 0;
    for (var i = 0; i < group.children.length; i++) {
        if (group.children[i].alive == true) {
            count_alive++;
        }
    }
  
    if (count_alive === 0 && wlevel < 3) {
        wlevel = wlevel + 1
        game.state.start("play", true, false, wlevel);
    } else if (count_alive === 0 && wlevel === 3) {
        //normally game over but loop back here to start 
        wlevel = 1
        game.state.start("play", true, false, wlevel);
    }
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/