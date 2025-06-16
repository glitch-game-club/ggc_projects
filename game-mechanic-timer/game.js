/* globals Phaser */
var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var playState = {};

playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fbackground.png?1539353652001");
    game.load.audio("splat", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fsplat.wav?1539513041296");
};

playState.create = function () {
    var background = game.add.sprite(0, 0, "background");
    background.height = 360;
    background.width = 480;
    
    this.timeLimit = 5;
    this.timeText = game.add.text(10, 10, "00:00");
    this.timeText.fill = "#000000";
    this.timer = game.time.events.loop(1000, tick, this);
};

playState.update = function () {
};

var tick = function () {
    this.timeLimit--;
    var minutes = Math.floor(this.timeLimit / 60);
    var seconds = this.timeLimit - (minutes * 60);
    var timeString = addZeros(minutes) + ":" + addZeros(seconds);
    this.timeText.text = timeString;
    if (this.timeLimit === 0) {
        outofTime();
    }
};

var addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

var outofTime = function () {
    var splatNoise = game.add.audio("splat");
    splatNoise.play();
    game.state.start("play");
}


game.state.add("play", playState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/

// This timer code is based on this tutorial https://phasergames.com/phaser-timer-basics-tutorial/