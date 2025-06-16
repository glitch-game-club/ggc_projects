/*global Phaser */
// List the variables we will be using later
var gravity = 600;
var playerMoveSpeed = 200;
var playerJumpSpeed = 400;
var timelimit = 20;
var player;
var platforms;
var coins;
var hazards;
var coinSound;
var hazardSound;
var enemy1;
var tween1;
var particle;
var wlevel = 0;

var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var playState = {};

playState.init = function (wlevel) {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    wlevel = wlevel;
};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("background", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fbackground.png?1539353652001");
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
    game.load.image("grass:8x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_8x1.png?1539358573699");
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png?1539353650540", 22, 22);
    game.load.spritesheet("hazard", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Ffire2.png?1539358187974", 11, 27);
    game.load.image('particle', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/greypixels.png');
    game.load.audio("coinwav1", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_1.wav?1537903834353");
    game.load.audio("coinwav2", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_2.wav?1537903834353");
    game.load.audio("hazardwav", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fsplat.wav?1539513041296");
    game.load.audio("hazardwav1", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_lose_1.wav?1537903834482");
    game.load.audio("hazardwav2", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_lose_2.wav?1537903834482");
};

playState.create = function () {
    var ground;
    var platform;
    var coin;
    var enemy1;
    var tween1;
    var hazard1;
    var level;
   // var level1j;
    var leveldata;
    var level1 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":150,"y":240},{"image":"grass:8x1","x":250,"y":160},{"image":"grass:4x1","x":75,"y":100}]};
    var level2 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":50,"y":240},{"image":"grass:4x1","x":300,"y":160},{"image":"grass:4x1","x":75,"y":100}]};
    var level3 = {"platforms":[{"image":"ground","x":0,"y":325},{"image":"grass:4x1","x":250,"y":240},{"image":"grass:4x1","x":300,"y":160},{"image":"grass:4x1","x":75,"y":100}]};
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    var background = game.add.sprite(0, 0, "background");
    background.height = 360;
    background.width = 480;
    
    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5, 0.5);
    player.animations.add("stop", [0]);
    player.animations.add("run", [1, 2], 8, true); // 8fps looped
    player.animations.add("jump", [3]);
    player.animations.add("fall", [4]);
    player.animations.play("stop");
    
    platforms = game.add.group();
    platforms.enableBody = true;
   
    if (!wlevel ||  wlevel ===1){
      leveldata = level1;
    }
    else if (wlevel === 2 ){
      leveldata = level2;
    } 
    else if (wlevel === 3 ){
      leveldata = level3;
    }
    //from https://mozdevs.github.io/html5-games-workshop/en/guides/platformer/creating-platforms/
    //make a separate function? 

    for (var i = 0; i < leveldata.platforms.length; i++) {
        platform = platforms.create(leveldata.platforms[i].x, leveldata.platforms[i].y, leveldata.platforms[i].image);
        platform.body.immovable = true;
    }
  
    coins = game.add.group();
    coins.enableBody = true;
    for (var i = 1; i < 5; i++) {
        coin = coins.create(i * 100, 0, "coin");
        coin.body.gravity.y = 200;
        coin.animations.add("rotate", [0, 1, 2, 1], 6, true);
        coin.animations.play("rotate");
    }
  
    coinSound = game.add.audio("coinwav1");
    hazards = game.add.group();
    hazards.enableBody = true;
    hazard1 = hazards.create(100, 300, "hazard");
    hazard1.animations.add("flicker", [0, 1], 6, true);
    hazard1.animations.play("flicker");
    hazardSound = game.add.audio("hazardwav");

    enemy1 = hazards.create(250, 128, "enemy");
    enemy1.animations.add("crawl", [0, 1, 2], 8, true);
    enemy1.animations.add("die", [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);  
    enemy1.animations.play("crawl");
    enemy1.type = "enemy";
  
    tween1 = game.add.tween(enemy1);
    tween1.to({
        x: enemy1.body.x + 150,
        y: 128
    }, 2000, null, true, 0, -1, true);
  
    this.setParticles();

    //total time until trigger
    this.timeInSeconds = timelimit;
    //make a text field
    this.timeText = game.add.text(10, 10, "0:00");
    //turn the text white
    this.timeText.fill = "#ffffff";
    //set up a loop timer
    this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
};

playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.overlap(player, coins, playState.collectCoins, null, game);
    game.physics.arcade.overlap(player, hazards, playState.hitHazard, null, game);

    // update image flipping & animations
      // jumping
    if (player.body.velocity.y < 0) {
        player.animations.play("jump");
    }  
    else if (player.body.velocity.y >= 0 && !player.body.touching.down) {
        player.animations.play("fall");
    }
    else if (player.body.velocity.x !== 0 && player.body.touching.down) {
        player.animations.play("run");
    }     
    else{
        player.animations.play("stop");
    }
    
    if (player.body.velocity.x < 0) {
        player.scale.x = -1;
    }
    else if (player.body.velocity.x > 0) {
        player.scale.x = 1;
    }
  
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -playerMoveSpeed
       // player.animations.play("run");
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      player.body.velocity.x = playerMoveSpeed;
      //player.animations.play("run");
    }
    else {
      player.body.velocity.x = 0;

    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down === true) {
      player.body.velocity.y = -playerJumpSpeed
    }

    playState.checkAlive(coins);
};

playState.collectCoins = function (player, coin) {
    coin.kill();
    coinSound.play();
};

playState.hitHazard = function (player, hazard) {
      
    if (hazard.type==="enemy" && player.body.velocity.y > 0) {
        coinSound.play();        
        hazard.kill();        
        particle.x = hazard.x;
        particle.y = hazard.y+10;
	      particle.start(true, 300, null, 20);
    }
    else {
        player.kill();
        hazardSound.play();

        particle.x = player.x;
        particle.y = player.y+10;
	      particle.start(true, 300, null, 20);
        game.time.events.add(500, playState.gameOver, this);      
    }
};

playState.nextlevel = function () {
    if (!wlevel) wlevel = 1;
    wlevel = wlevel + 1
    game.state.start("play", true, false, wlevel);
}

playState.gameOver = function () {
    game.state.start("gameover");
}

playState.tick = function () {
    //subtract a second
    this.timeInSeconds--;
    //find how many complete minutes are left
    var minutes = Math.floor(this.timeInSeconds / 60);
    //find the number of seconds left
    //not counting the minutes
    var seconds = this.timeInSeconds - (minutes * 60);
    //make a string showing the time
    var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
    //display the string in the text field
    this.timeText.text = timeString;
    //check if the time is up
    if (this.timeInSeconds === 0) {
        game.state.start("gameover");
    }
};

playState.setParticles = function() {
      particle = game.add.emitter(0, 0, 20);
      particle.makeParticles('particle');
      particle.setYSpeed(-150, 150);
      particle.setXSpeed(-150, 150);
      particle.gravity = 0;

};

playState.checkAlive = function (group) {
    var count_alive = 0;
    for (var i = 0; i < group.children.length; i++) {
        if (group.children[i].alive == true) {
            count_alive++;
        }
    }
    if (count_alive == 0 && wlevel < 3) {
        this.nextlevel();
    } else if (count_alive == 0 && wlevel == 3) {
        game.state.start("youwin");
    }
};

playState.addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

var startState = {}

startState.init = function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
};

startState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("s1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fmove_me.png?1539354777104");
    game.load.image("s2", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcatch_you.png?1539354776985");
    game.load.image("getready", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fget-ready.png?1539355748507");
    game.load.image("youwin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fyou-win.png?1539355748555");
    game.load.image("gameover", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgame-over.png?1539355748623");
};

startState.create = function () {
    player = game.add.sprite(20, 215, "player");
    player.animations.add("right", [1, 2, 3, 4], 6, true);
    player.scale.setTo(1.5);
    player.visible = false;
    enemy1 = game.add.sprite(350, 120, "enemy");
    enemy1.animations.add("crawl", [0, 1, 2], 8, true);
    enemy1.animations.add("die", [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    enemy1.scale.setTo(1.5);
    enemy1.visible = false;
    // start animation
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(3000, this.enemyMove, this);
    game.time.events.add(2000, this.playerMove, this);
    game.time.events.add(3000, this.s1, this);
    game.time.events.add(5000, this.s2, this);
    game.time.events.add(7000, this.getready, this);
    game.time.events.add(8000, this.start, this);
};

startState.update = function () {
};

startState.playerShow = function () {
    player.visible = "true";
};

startState.enemyMove = function () {
    enemy1.visible = true;
    tween1 = game.add.tween(enemy1);
    enemy1.animations.play("crawl");
    tween1.to({
        x: 250,
        y: 120
    }, 2000, null, true, 0, 0, false);
};

startState.playerMove = function () {
    var tween = game.add.tween(player);
    tween.to({
        x: 70,
        y: 215
    }, 1000, null, true, 0, 0, false);
    player.animations.play("right");
};

startState.s1 = function () {
    player.animations.stop();
    var s1 = game.add.sprite(player.x - 70, player.y - 50, "s1");
};

startState.s2 = function () {
    var s2 = game.add.sprite(enemy1.x - 145, enemy1.y - 50, "s2");
    enemy1.animations.stop();
    enemy1.frame = 11;
};

startState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, "getready");
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 1000, null, true, 0, 0, false);
}

startState.start = function () {
    game.state.start("play");
};

var gameoverState = {};
gameoverState.create = function () {
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, "gameover");
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
    game.time.events.add(2000, this.getready, this);
    game.time.events.add(4000, this.restart, this);
};
gameoverState.restart = function () {
    wlevel = 0;
    game.state.start("play");
};
gameoverState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, "getready");
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
};

var youwinState = {};
youwinState.create = function () {
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, "youwin");
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
    game.time.events.add(2000, this.getready, this);
    game.time.events.add(4000, this.restart, this);
};
youwinState.restart = function () {
    wlevel = 0;
    game.state.start("play");
};
youwinState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, "getready");
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
};

game.state.add("play", playState);
game.state.add("start", startState);
game.state.add("gameover", gameoverState);
game.state.add("youwin", youwinState);
game.state.start("start");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/