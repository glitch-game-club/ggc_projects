/* global Phaser */
var player;
var platforms;
var hazards;
var enemy1;
var ground;

var jumpNoise;
var splatNoise;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
  
    // Here we preload the audio assets - make more here http://sfbgames.com/chiptone/
    game.load.audio("jump", "https://cdn.glitch.com/80a5a58a-af34-4348-81df-7c05260f8ceb%2Fjump.wav?1554381190342");
    game.load.audio("splat", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fsplat.wav?1539513041296");
  
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
    enemy1.type = "enemy";

    // add audio to two variable ready to play later in other functions
    splatNoise = game.add.audio("splat");
    jumpNoise = game.add.audio("jump");
  
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
      jumpNoise.play()
    }

};

var hitHazard = function (player, hazard) {
    splatNoise.play();
    restart();
};

var restart = function () {
    game.state.start("play");
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/