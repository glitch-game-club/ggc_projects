// Don't!! List the variables we will be using later

// Start the game at a certain size 
var game = new Phaser.Game(400, 300);

var playState = {  
    init: function() {  
    },
    preload: function() {
      game.load.crossOrigin = 'anonymous';
      game.load.image('background', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/clouds-h.png');
      game.load.image('player', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/pirate-1.png');
      game.load.image('ground', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/ground.png');
      game.load.image('grass:4x1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/grass_4x1.png');
      game.load.spritesheet('coin', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/coin_animated.png', 22, 22);
      game.load.audio('coinwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/win.wav'); 
      game.load.spritesheet('hazard', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/fire2.png', 11, 27);
      game.load.spritesheet('enemy', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/mimic.png', 32, 32);
      game.load.audio('hazardwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav');
      
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

      coins = game.add.group();
      coins.enableBody = true;      
      
      for (var i = 1; i < 4; i++)
        {
          coin = coins.create(i * 100, 0, 'coin');

          coin.body.gravity.y = 200;
          coin.animations.add('rotate', [0, 1, 2, 1], 6, true); 
          coin.animations.play('rotate');
        }
      
      coinSound = game.add.audio('coinwav');

      hazards = game.add.group();
      hazards.enableBody = true;
      hazard1 = hazards.create(100, 250, 'hazard');
      hazard1.animations.add('flicker', [0, 1], 6, true); 
      hazard1.animations.play('flicker');

      hazardSound = game.add.audio('hazardwav');

      enemy1 = hazards.create(180, 115, 'enemy');
      enemy1.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10], 6, true); 
      enemy1.animations.play('fly');

      tween1 = game.add.tween(enemy1);
      tween1.to({x:350, y: 115}, 2000, null, true, 0,-1,true);
      
    },
    update: function() {  
      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.collide(coins, platforms);
      game.physics.arcade.overlap(player, coins, this.collectCoins);
      game.physics.arcade.overlap(player, hazards, this.hitHazard);
      
      player.body.velocity.x = 0;
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) == true) {
        player.body.velocity.x = -200;
      } 
      
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) == true) {
      player.body.velocity.x = 200;
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP) == true && player.body.touching.down === true) {
      player.body.velocity.y = -300;
      }

      this.checkAlive(coins);
    },

    collectCoins: function(player,coin) { 
     coin.kill();        
     coinSound.play();
    },
  
    hitHazard: function(player,hazard) { 
      player.kill();        
      hazardSound.play();
      game.state.restart();
    },  
    
    checkAlive: function(group) {    
      var count_alive = 0;
      for (i = 0; i < group.children.length; i++) {
        if (group.children[i].alive == true) {
          count_alive++;
        }
      }
      if (count_alive == 0) {
        game.state.restart('play'); 
      }
  },

  
  
}

game.state.add('play', playState);  
game.state.start('play');