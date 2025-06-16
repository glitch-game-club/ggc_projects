/* globals Phaser */

var player;
var platforms;
var hazards;
var enemy1;
var ground;
var sweat;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("sweat", "https://cdn.glitch.com/44c6651b-f32c-4a48-a8ab-c2ad3ce91d17%2Fgreypixels.png?1542974943231");

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
  
    ground = platforms.create(0, 320, "ground");
    ground.body.immovable = true;
  
    hazards = game.add.group();
    hazards.enableBody = true;

    enemy1 = hazards.create(300, 290, "enemy");
    enemy1.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
  
    setParticles();

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
      player.kill();
      sweat.x = player.x;
  		sweat.y = player.y+10;
	  	sweat.start(true, 300, null, 20);
      game.time.events.add(1000, restart, this);
};

var restart = function () { 
    game.state.start("play");
};

var setParticles = function() {
      sweat = game.add.emitter(0, 0, 20);
      sweat.makeParticles('sweat');
      sweat.setYSpeed(-150, 150);
      sweat.setXSpeed(-150, 150);
      sweat.gravity = 0;
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
