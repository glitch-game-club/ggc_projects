/* globals Phaser */
var player;
var platforms;

var hazards;
var enemy1;
var ground;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png", 36, 42);
    game.load.spritesheet("enemy1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png");
};

playState.create = function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
  
    game.add.sprite(0, 0, "background");
   
    hazards = game.add.group();
    hazards.enableBody = true;

    enemy1 = game.add.sprite(300,290, "enemy1");
    hazards.add(enemy1);
  
    player = game.add.sprite(100, 200, "player");
  
    player.body.gravity.y = 500;
    player.animations.add('die', [0, 5, 6, 5, 6, 5, 6], 12);
  
    player.body.collideWorldBounds = true;
    
    platforms = game.add.group();
    platforms.enableBody = true;
  
    ground = platforms.create(0, 320, "ground");
    ground.body.immovable = true;

};

playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, hazards, hitHazard);

  
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

var hitHazard = function (player, hazard) {
    player.body.velocity = 0;
    player.input.enabled = false;
    player.animations.play('die');
    game.input.keyboard.disabled = true;
    game.time.events.add(500, restart, this);          
};

var restart = function () {
    game.state.start("play");
  };

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
