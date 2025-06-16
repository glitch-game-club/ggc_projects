// List the variables we will be using later
var player; 
var platforms;
var ground;
var platform1;
var platform2;
var platform3;

// Start the game at a certain size 
var game = new Phaser.Game(400, 300);

var playState = {  
    init: function() {  
    },
    preload: function() {
      game.load.crossOrigin = 'anonymous';
      game.load.image('background', 'images/clouds-h.png');
      game.load.image('player', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/pirate-1.png');
      game.load.image('ground', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/ground.png');
      game.load.image('grass:4x1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/grass_4x1.png');
      
    },
    create: function() {      
      //add physics to the game
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.enableBody = true;
      
      game.add.sprite(0, 0, 'background');
      player = game.add.sprite(0, 0, 'player');
      player.body.gravity.y = 500; 
      player.body.collideWorldBounds=true;
      
      platforms = game.add.group();
      platforms.enableBody = true;
      
      ground = platforms.create(0, 275, 'ground');
      ground.body.immovable = true;
      
      platform1 = platforms.create(150, 220, 'grass:4x1');
      platform1.body.immovable = true;
      
      platform2 = platforms.create(250, 150, 'grass:4x1');
      platform2.body.immovable = true;

      platform3 = platforms.create(75, 100, 'grass:4x1');
      platform3.body.immovable = true;
      
    },
    update: function() {  
      game.physics.arcade.collide(player, platforms);
      
      player.body.velocity.x = 0;
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -200;
      } 
      
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = 200;
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP) == true && player.body.touching.down === true) {
      player.body.velocity.y = -300;
      }
    },
}

game.state.add('play', playState);  
game.state.start('play');
