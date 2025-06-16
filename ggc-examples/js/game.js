/* global Phaser */
// game variables  at the beginning so more than one function can access them.

// Parts of the game
var player;

// Initialize the game at a certain size
var game = new Phaser.Game(550, 400, Phaser.AUTO, "game", "", false, false);

var startState = {};

startState.preload = function () {
    
    game.load.crossOrigin = "anonymous";
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.image("speech1", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fgame_maker_q.png?v=1561976221137");
    game.load.image("speech2", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fgame_element.png?v=1561980930067");
  
    game.load.image("choice1", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fgame_maker_q.png?v=1561976221137");
    game.load.image("socialiser", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fsocialiser.png?v=1561977110734");
    game.load.image("glitcher", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fglitcher.png?v=1561977110375");
    game.load.image("magpie", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fmagpie.png?v=1561977110861");
    game.load.image("planner", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fplanner.png?v=1561977110589");
    game.load.image("mechanics", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fmechanics.png?v=1561978074322");
    game.load.image("polish", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fpolish.png?v=1561978074470");
    game.load.image("space", "https://cdn.glitch.com/6ff7c5f4-0175-4e05-aa07-ed75e43fd2e5%2Fspace.png?v=1561978063631");

};

startState.create = function () {
    player = game.add.sprite(20, 215, "player");
    player.animations.add("walk", [1, 2, 3, 4], 6, true);
    player.scale.setTo(1.5);
    player.visible = false;

    // start animation
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(2000, this.playerMove, this);
    game.time.events.add(3000, this.speech1, this);
    game.time.events.add(5000, this.choice1, this);
};

startState.update = function () {
};

startState.playerShow = function () {
    player.visible = true;
};

startState.playerMove = function () {
    var tween = game.add.tween(player);
    tween.to({x: 70, y: 215}, 1000, null, true, 0, 0, false);
    player.animations.play("walk");
};

startState.speech1 = function () {
 //   var urlList = ["https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-add-your-own-background", "https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-adding-our-own-sound-effects","https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-add-moving-enemies" ];  
 //   var urlOne = urlList[Math.floor(Math.random() * urlList.length)];
    player.animations.stop();
    this.speechOne = game.add.sprite(player.x - 30, player.y - 50, "speech1");
   
};

startState.choice1 = function () {
    player.visible = false;
    this.speechOne.visible = false;
    this.titles = game.add.group();

    this.socialiser = game.add.button(25, 100, "socialiser", this.speech2, this);
    this.socialiser.scale.setTo(0.4, 0.4);
    this.titles.add(this.socialiser);
    this.planner = game.add.button(330, 100, "planner", this.speech2, this);
    this.planner.scale.setTo(0.4, 0.4);
    this.titles.add(this.planner);
    this.glitcher = game.add.button(40, 280, "glitcher", this.speech2, this);
    this.glitcher.scale.setTo(0.4, 0.4);
    this.titles.add(this.glitcher);
    this.magpie = game.add.button(350, 280, "magpie", this.speech2, this);
    this.magpie.scale.setTo(0.4, 0.4);
    this.titles.add(this.magpie);

};

startState.speech2 = function () {

 //   var urlOne = urlList[Math.floor(Math.random() * urlList.length)];
    player.animations.stop();
    player.visible = true;
    this.titles.visible = false;

    this.speechOne = game.add.button(player.x - 30, player.y - 50, "speech2");
    game.time.events.add(2000, this.choice2, this); 
};

startState.choice2 = function () {
    var urlListMechanics = ["https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-jumping-on-enemies", "https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-add-a-countdown-timer","https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-add-moving-enemies" ];  
      var urlListPolish = ["https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-add-animation-to-your-character", "https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-adding-our-own-sound-effects","https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-add-soundtrack-music" ];  
    var urlListSpace = ["https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#polish-add-your-own-background", "https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-extending-the-game-size","https://en.flossmanuals.net/phaser-game-making-in-glitch/_full/#game-mechanic-extending-the-game-size" ];  
  
  
    var urlMechanics = urlListMechanics[Math.floor(Math.random() * urlListMechanics.length)];
    var urlPolish = urlListPolish[Math.floor(Math.random() * urlListPolish.length)];
    var urlSpace = urlListSpace[Math.floor(Math.random() * urlListSpace.length)];
 
  
    this.mechanics = game.add.button(130, 50, "mechanics", function() {top.location.href = urlMechanics;},this);
    this.mechanics.scale.setTo(0.5, 0.5);

    this.polish = game.add.button(40, 300, "polish", function() {top.location.href = urlPolish;},this);
    this.polish.scale.setTo(0.5, 0.5);
    this.space = game.add.button(310, 300, "space", function() {top.location.href = urlSpace;},this);
    this.space.scale.setTo(0.5, 0.5);
};

startState.start = function () {
    game.state.start("play");
};

//Add and start our play state
game.state.add("start", startState);
game.state.start("start");