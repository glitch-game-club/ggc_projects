/*globals Phaser */
var player;
var platforms;
var hazards;
var enemy1;
var ground;
var platform1;
var jumpTimer = 0;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("platform", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_6x1.png?1539358573422");
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

    platform1 = platforms.create(200, 220, "platform");
    platform1.body.immovable = true;
  
};

playState.update = function () {
    game.physics.arcade.collide(player, platforms);

  
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.body.velocity.x = -300
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = 300;
    }
    else {
      player.body.velocity.x = 0;
    }
   
   //this solution from https://thoughts.amphibian.com/2015/11/tuning-jumps-in-my-phaser-platformer.html  

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))  {
        if (player.body.touching.down && jumpTimer === 0) {
            // jump is allowed to start
            jumpTimer = 1;
            player.body.velocity.y = -300;
        } else if (jumpTimer > 0 && jumpTimer < 31) {
            // keep jumping higher
            jumpTimer++;
            player.body.velocity.y = -300 + (jumpTimer * 5);
        }   
    }  
    else {
        // jump button not being pressed, reset jump timer
        jumpTimer = 0;
    }
};

game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
