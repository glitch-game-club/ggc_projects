
var game = new Phaser.Game(550,400);

var playState = {};

playState.preload = function () {
  game.load.crossOrigin = "anonymous";
  game.load.image("background","pasteinhere");
};


playState.create = function () {
game.add.sprite(0,0,"background");
};


playState.update = function () {

};


//Add and start our play state
game.state.add("main", playState);
game.state.start("main");



























playState.preload = function () {

  game.load.crossOrigin = "anonymous";
  game.load.image("background","https://cdn.glitch.com/0bac3037-b8c3-47d7-9688-67ab7fe8e613%2Fhuba_samia_sm.jpg?1549269321834")
};















