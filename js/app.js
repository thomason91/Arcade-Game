// Enemies our player must avoid
var Enemy = function(x, y, s) {
    
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
    
    // Updates the enemy's position
    this.x = x;
    this.y = y;
    this.sideways = 101;
    this.backAndForth = 83;
    this.speed = s;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Movement is multiplied by the dt parameter,
    // which ensures the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -101;
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
// Includes an update(), render() and handleInput() method
class Princess {
    constructor() {
        this.sprite = 'images/char-princess-girl.png';
        this.x = 202;
        this.y = 395;
        this.sideways = 101;
        this.backAndForth = 83;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    // handleInput() method accepts valid key inputs and moves player 
    // accordingly within specified boundaries
    handleInput(input) {
        if (input === 'left'&& this.x > 0) {
            this.x -= this.sideways;
        } else if (input === 'up' && this.y > 0) {
            this.y -= this.backAndForth;
        } else if (input === 'right' && this.x < 332) {
            this.x += this.sideways;
        } else if (input === 'down' && this.y < 373.5) {
            this.y += this.backAndForth;
        }
    }
    
    // update() method checks for collision or win event
    update() {
        for(let enemy of allEnemies) {
            if ((this.y === enemy.y) && (enemy.x + 60 > this.x) && (this.x + 60 > enemy.x)) {
                this.reset();
            } else if (this.y === -20) {
                this.win();
            }
        }
    }
   
    // reset() method sends player back to starting position
    reset() {
        this.x = 202;
        this.y = 395;
    }
    
    // win() method displays an alert and resets player
    win() {
        alert('You Win!');
        this.reset();
    }
};

// Object instantiation
// All enemy objects are placed in an array called allEnemies
const allEnemies = [];
const enemyBug1 = new Enemy(0, 63, 200);
const enemyBug2 = new Enemy(0, 63, 150);
const enemyBug3 = new Enemy (0, 146, 225);
const enemyBug4 = new Enemy(0, 229, 250);
const enemyBug5 = new Enemy(0, 229, 315);
allEnemies.push(enemyBug1, enemyBug2, enemyBug3, enemyBug4, enemyBug5);

// player object is placed in a variable called player
const player = new Princess();

// This listens for key presses and sends the keys 
// to the Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

