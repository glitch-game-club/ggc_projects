var backgroundnoise;

var game = new Phaser.Game(480, 360, Phaser.AUTO);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.audio('backgroundnoise' , 'https://cdn.glitch.com/04f51d70-ab26-4960-8e87-12f2aa251cff%2Fbackground_noise.wav');
};

playState.create = function () {
    backgroundnoise = game.sound.add("backgroundnoise", 1, true);
    backgroundnoise.play(); 
};

playState.update = function () {
  
};

game.state.add("play", playState);
game.state.start("play");

// Audio Credits
// Joe and Ted - glitch game club members
