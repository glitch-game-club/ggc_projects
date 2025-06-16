/* globals Phaser */

var player;
var platforms;
var keysdoors;
var key;
var door;
var hasKey = false;
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
    game.load.image("key", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fkey.png?1539353651419");
    game.load.spritesheet('door', 'https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fdoor.png?1539353650737', 42, 66);

};

playState.create = function () {
  
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    game.add.sprite(0, 0, "background");
  
    if (!currentLevel ||  currentLevel  ===1){
      leveldata = loadLevelOne();
    }
    else if (currentLevel  === 2 ){
      leveldata = loadLevelTwo();
    } 
  
    door.animations.add("open", [1, 2], 8); // 8fps   
    platforms = game.add.group();
    platforms.enableBody = true;
  
    keysdoors = game.add.group();
    keysdoors.enableBody = true;
  
    for (var i = 0; i < leveldata.platforms.length; i++) {
        var platform = platforms.create(leveldata.platforms[i].x, leveldata.platforms[i].y, leveldata.platforms[i].image);
        platform.body.immovable = true;
    }
  
    //move the player down here so it stays at the front
    player = game.add.sprite(100, 200, "player");
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;  
};

var loadLevelOne = function(){
    var level1 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:4x1","x":250,"y":160},{"image":"grass:4x1","x":75,"y":100}]};
    key = game.add.sprite(100,25,"key"); 
    door = game.add.sprite(20,260,"door"); 
    return level1;
};

var loadLevelTwo = function(){
    var level2 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:4x1","x":250,"y":160},{"image":"grass:4x1","x":375,"y":120}]};  
    key = game.add.sprite(400,55,"key"); 
    door = game.add.sprite(20,260,"door"); 
    return level2;
};


playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, key, hitKeys);
    game.physics.arcade.overlap(player, door, hitDoors);

  
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

};

var hitKeys = function (player, key) {
    key.kill();
    hasKey = true;
};

var hitDoors = function (player, door) {
    if (hasKey === true){
      door.animations.play("open");
      hasKey = false;     
      game.time.events.add(1000, nextLevel, this);
    }
};

var nextLevel = function(){
    if (currentLevel  < 2){
      currentLevel += 1;
      game.state.start("play", true, false, currentLevel);
    }
    else {
      currentLevel = 1;
      game.state.start("play", true, false, currentLevel);
    }      
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/