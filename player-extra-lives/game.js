/* globals Phaser */
var player;
var platforms;
var hazards;
var enemy1;
var ground;
var health;
var meters;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("heart", "https://cdn.glitch.com/c2f2e13b-6443-410a-afed-fe83578f1598%2Fheart.png?1552248486967");

};

playState.create = function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    game.add.sprite(0, 0, "background");
 
    player = game.add.sprite(100, 200, "player");
    player.body.gravity.y = 500;
    player.health = 100;
  
    player.body.collideWorldBounds = true;
    
    platforms = game.add.group();
    platforms.enableBody = true;
  
    ground = platforms.create(0, 320, "ground");
    ground.body.immovable = true;
  
    hazards = game.add.group();
    hazards.enableBody = true;

    enemy1 = hazards.create(300, 290, "enemy");
    enemy1.type = "enemy";
  
};

playState.update = function () {
  
    if (player.health === 0) {
      restart();
    }
  
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, hazards, hitHazard, null, this);
  
    if (!player.immune && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.body.velocity.x = -300
    } 
    else if (!player.immune && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = 300;
    }
    else if (!player.immune) {
      player.body.velocity.x = 0;
    }
  
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down === true) {
      player.body.velocity.y = -300
    }

};

var restart = function () {
    game.state.start("play");
  };

var hitHazard = function (player, hazard) {


    if (!player.immune) {
      player.damage(10);
      updateHealthBar();
      player.immune = true;
      game.time.events.add(200, function () {player.immune = false;}, this);
    }

    if (player.body.position.x < enemy1.body.position.x) {
      player.body.velocity.x = -200;      
    } 
    else {
      player.body.velocity.x = 200;
    }    
};


var createHealthBar = function () {
     meters = game.add.group();
 
    // create a plain black rectangle to use as the background of a health meter
    var meterBackgroundBitmap = game.add.bitmapData(20, 100);
    meterBackgroundBitmap.ctx.beginPath();
    meterBackgroundBitmap.ctx.rect(0, 0, meterBackgroundBitmap.width, meterBackgroundBitmap.height);
    meterBackgroundBitmap.ctx.fillStyle = '#000000';
    meterBackgroundBitmap.ctx.fill();
 
    // create a Sprite using the background bitmap data
    var healthMeterBG = game.add.sprite(10, 10, meterBackgroundBitmap);
    healthMeterBG.fixedToCamera = true;
    meters.add(healthMeterBG);
 
    // create a red rectangle to use as the health meter itself
    var healthBitmap = game.add.bitmapData(12, 92);
    healthBitmap.ctx.beginPath();
    healthBitmap.ctx.rect(0, 0, healthBitmap.width, healthBitmap.height);
    healthBitmap.ctx.fillStyle = '#FF0000';
    healthBitmap.ctx.fill();
 
    // create the health Sprite using the red rectangle bitmap data
    health = game.add.sprite(14, 14, healthBitmap);
    health.fixedToCamera = true;
};


game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/