
var Furry = require('./furry.js');
var Coin = require('./coin.js');

//konstruktor gry
var Game = function() {
	this.board = document.querySelectorAll('#board div');
	this.furry = new Furry();
	this.coin = new Coin();
	this.score = 0;
	var self = this;

    this.index = function(x,y) {
		return x + (y * 10);
    }

    this.showFurry = function() {
		  this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    }

    this.hideVisibleFurry = function() {
		var visible = document.querySelector('.furry');
		visible.classList.remove('furry');
    }

    this.showCoin = function() {
		this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }

    this.moveFurry = function() {
		  this.hideVisibleFurry(); 
    if (this.furry.turnFurry === "up") {
      this.furry.y -= 1;
    } else if (this.furry.turnFurry === "right") {
      this.furry.x += 1;
    } else if (this.furry.turnFurry=== "down"){
      this.furry.y += 1;
    } else if (this.furry.turnFurry === "left") {
      this.furry.x -=1;
    }
    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
	}

    this.turnFurry = function(event) {
		switch (event.which) {
			case 37:
				this.furry.turnFurry = 'left';
				break;
			
			case 39: 
				this.furry.turnFurry = 'right';
				break;
			
			case 38: 
				this.furry.turnFurry = 'up';
				break;
			
			case 40:
				this.furry.turnFurry = 'down';
				break;
		}
    }

	document.addEventListener('keydown', function(event){
		self.turnFurry(event);
	});
	
    this.checkCoinCollision = function() {
		if(this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
			var coinBox=document.querySelector('.coin');
			coinBox.classList.remove('coin');
			var result = document.querySelector('strong');
			result.textContent = parseInt(result.textContent) + 1;
			this.coin=new Coin();
			this.showCoin();
		}
    }

    this.gameOver = function() {
		if (this.furry.x<0 || this.furry.x>9 || this.furry.y<0 || this.furry.y>9) {
			clearInterval(this.idSetInterval);
			var over = document.getElementById('over');
			over.classList.remove('invisible');
			var score = document.querySelector('.result');
			var strong = document.querySelector('strong')
			score.textContent = strong.textContent;
			this.hideVisibleFurry();
		}
    }

    this.startGame = function() {
		this.idSetInterval = setInterval(function() {
		self.moveFurry()
    }, 250);
    }
}

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

module.exports = Game;