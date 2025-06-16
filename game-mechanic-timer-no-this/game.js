var game = new Phaser.Game(480, 360, Phaser.AUTO, "", "", false, false);

var playState = {};


playState.preload = function () {
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fbackground.png?1539353652001");
};

playState.create = function () {
    var background = game.add.sprite(0, 0, "background");
    background.height = 360;
    background.width = 480;
    
    this.timeLimit = 5;
    this.timeText = game.add.text(10, 10, "00:00");
    this.timeText.fill = "#000000";
    this.timer = game.time.events.loop(1000, this.tick, this);
};

playState.update = function () {
};

playState.gameOver = function () {
    game.state.start("gameover");
}

playState.tick = function () {
    this.timeLimit--;
    var minutes = Math.floor(this.timeLimit / 60);
    var seconds = this.timeLimit - (minutes * 60);
    var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
    this.timeText.text = timeString;
    if (this.timeLimit === 0) {
        game.state.start("gameover");
    }
};

playState.addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};


var gameoverState = {};

gameoverState.create = function () { 
    this.gameoverText = game.add.text(10, 10, "Game Over");
    this.gameoverText.fill = "#ffffff";
    game.time.events.add(2000, this.restart, this);
};

gameoverState.restart = function () {
    game.state.start("play");
};


game.state.add("play", playState);
game.state.add("gameover", gameoverState);
game.state.start("play");

//Art Credits
// Most Game assests here are from Kenny on Open Game Art and then phasered by Belen Albeza -- CC-0 licence
// Text art is generated here http://wigflip.com/ds/ and here https://textcraft.net/

// This timer code is based on this tutorial https://phasergames.com/phaser-timer-basics-tutorial/