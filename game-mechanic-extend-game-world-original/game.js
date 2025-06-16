/* globals Phaser */
var player;
var background;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("background", "https://cdn.glitch.com/15179919-03ae-4c8f-b03d-61a37724b68c%2Fbackground2.png?1540218254307");
};

playState.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    background  = game.add.tileSprite(0, 0, 480, 360, 'background');
    game.world.setBounds(0, 0, 900, 360);
    
 
    player = game.add.sprite(100, 200, "player");
    player.body.gravity.y = 500;
  
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    background.fixedToCamera = true
    

};

playState.update = function () {
  
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      player.body.velocity.x = -300
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = 300;
    }
    else {
      player.body.velocity.x = 0;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      player.body.velocity.y = -300
    }
  
    background.tilePosition.set(-game.camera.x, -game.camera.y); 
};


game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/