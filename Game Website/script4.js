window.addEventListener("load", () => {
    let selectedBall;
    
    function fetchFromDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch-ball-game4.php');
        xhr.onload = function () {
            const ballNumber = JSON.parse(xhr.responseText);
            selectedBall = parseInt(ballNumber);
            ColorBallFlap(selectedBall);
        };
        xhr.send();
    }

    fetchFromDatabase();
});

function ColorBallFlap(selectedColor) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const startButton = document.getElementById("start-button");
    const backButton = document.getElementById("back-button");
    const leaderboardButton = document.getElementById("leaderboard-button");
    const leaderboardBackground = document.getElementById("leaderboard-background");
    let menuSound = new Audio("assets/ColorBall Flap/Audio/Menu Audio/08 - Bouncing Baal v0_95.mp3");
    let gameSound = new Audio("assets/ColorBall Flap/Audio/Game Audio/gypsyTrial8Techno.wav");
    let buttonSound = new Audio("assets/ColorBall Flap/Audio/Sound Effects/zapsplat_multimedia_button_click_fast_short_002_79286.mp3");
    let flapSound = new Audio("assets/ColorBall Flap/Audio/Sound Effects/zapsplat_cartoon_very_fast_whoosh_swoosh_swipe_or_snatch_005_89384.mp3");
    let score = 0;
    let state = 2;
    let switchToGame = true;
    let switchToMenu = true;
    let switchToHighscore = true;

    function saveToDatabase() {
        const colorNumber = selectedColor;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-ball-game4.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`ball=${colorNumber}`);
    }
    
    window.onbeforeunload = function() {
        saveToDatabase();
    }

    class Color {
        constructor(ballColor, obstacleColor) {
            this.ballColor = ballColor;
            this.obstacleColor = obstacleColor;
        }
    }
    
    const colors = [
        new Color('red', ['red', 'yellow', 'green', 'blue']),
        new Color('yellow', ['yellow', 'blue', 'purple', 'orange']),
        new Color('green', ['green', 'pink', 'red', 'yellow']),
        new Color('blue', ['blue', 'orange', 'green', 'red']),
        new Color('purple', ['purple', 'green', 'yellow', 'blue']),
        new Color('orange', ['orange', 'red', 'pink', 'yellow']),
        new Color('pink', ['pink', 'blue', 'purple', 'green'])
    ];

    class Highscore {
        constructor(data, cwidth, cheight) {
            this.x = 260;
            this.y = 175;
            this.data = data;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.background = new Background('#262626', '#1a1a1a', this.cwidth, this.cheight);
            this.backButton = {
                image: backButton,
                x: 20,
                y: 20,
                width: 40,
                height: 40
            };
        }

        render() {
            this.background.draw();
            ctx.drawImage(leaderboardBackground, (this.cwidth - 350) / 2, 0, 350, this.cheight);
            ctx.drawImage(this.backButton.image, this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);

            ctx.fillStyle = 'white';
            ctx.font = '14px sans-serif';
            for(let i = 0; i < this.data.length; i++) {
                ctx.textAlign = 'left';
                ctx.fillText(this.data[i].username.toUpperCase(), this.x, this.y + i * 30);
                ctx.textAlign = 'right';
                ctx.fillText(this.data[i].ColorBallFlap, this.x + 240, this.y + i * 30);
            }
            ctx.textAlign = 'center';
        }

        handleClick(x, y) {
            if (x > this.backButton.x && 
                x < this.backButton.x + this.backButton.width && 
                y > this.backButton.y && 
                y < this.backButton.y + this.backButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 2;
            }
        }
    }

    class Menu {
        constructor(x, y, cwidth, cheight) {
            this.x = x;
            this.y = y - 50;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.background = new Background('#262626', '#1a1a1a', this.cwidth, this.cheight);
            this.startButton = {
                image: startButton,
                x: this.cwidth / 2,
                y: this.cheight / 2 + 100,
                width: 300,
                height: 100
            };
            this.leaderboardButton = {
                image: leaderboardButton,
                x: this.cwidth - 60,
                y: 20,
                width: 40,
                height: 40
            };
        }
  
        render() {
            this.background.draw();
            
            ctx.fillStyle = 'white';

            ctx.font = 'bold 40px arial';
            ctx.fillText('ColorBall Flap', this.x, this.y - 100);

            ctx.beginPath();
            ctx.moveTo(this.x - 75, this.y);
            ctx.lineTo(this.x - 50, this.y - 25);
            ctx.lineTo(this.x - 50, this.y + 25);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x + 75, this.y);
            ctx.lineTo(this.x + 50, this.y - 25);
            ctx.lineTo(this.x + 50, this.y + 25);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = colors[selectedColor].ballColor;
            ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
            ctx.fill();

            ctx.drawImage(this.leaderboardButton.image, this.leaderboardButton.x, this.leaderboardButton.y, this.leaderboardButton.width, this.leaderboardButton.height);
            ctx.drawImage(this.startButton.image, this.startButton.x - this.startButton.width / 2, this.startButton.y - this.startButton.height / 2, this.startButton.width, this.startButton.height);
            ctx.font = 'bold 20px arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        }
          
        handleClick(x, y) {
            if (x >= this.x - 100 && x <= this.x - 50 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedColor--;
                if (selectedColor < 0) {
                    selectedColor = colors.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedColor++;
                if (selectedColor >= colors.length) {
                    selectedColor = 0;
                }
            }

            if (
                x >= this.startButton.x - this.startButton.width / 2 && 
                x <= this.startButton.x + this.startButton.width / 2 && 
                y >= this.startButton.y - this.startButton.height / 2 && 
                y <= this.startButton.y + this.startButton.height / 2
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 1;
            }

            if (x > this.leaderboardButton.x && 
                x < this.leaderboardButton.x + this.leaderboardButton.width && 
                y > this.leaderboardButton.y && 
                y < this.leaderboardButton.y + this.leaderboardButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 3;
            }
        }
    }

    class Game {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.ball = new Ball(colors[selectedColor].ballColor, this.cwidth, this.cheight);
            this.camera = new Camera(this.cwidth, this.cheight);
            this.background = new Background('#262626', '#1a1a1a', this.cwidth, this.cheight);
            this.obstacles = [];
            this.obstacleY = this.cheight - 450;
        }
        update() {
            this.ball.update();
            this.camera.follow(this.ball);
            if (this.ball.obstacleCreation >= 200) {
                this.createObstacle();
                this.ball.obstacleCreation -= 200;
                this.obstacleY -= 200;
            }
            this.obstacles.forEach(object => {
                object.update();
            });
            this.collision();
        }
        draw() {
            this.background.draw();
            this.ball.draw(this.camera);
            this.obstacles.forEach(object => {
                object.draw(this.camera);
            });

            ctx.font = '20px sans-serif';
            ctx.fillStyle = "white";
            ctx.fillText(score, this.cwidth / 2, 30);
        }
        createObstacle() {
            this.obstacles.push(new Obstacle(colors[selectedColor].obstacleColor, this.obstacleY, this.cwidth, this.cheight));
        }
        collision() {
            this.obstacles.forEach(obstacle => {
                for(let i=0; i<obstacle.colors.length; i++) {
                    if (this.ball.x + this.ball.size >= obstacle.x1 + ((obstacle.cwidth / 4) * i) &&
                        this.ball.x <= obstacle.x1 + ((obstacle.cwidth / 4) * i) + obstacle.width &&
                        this.ball.y + this.ball.size >= obstacle.y &&
                        this.ball.y <= obstacle.y + obstacle.height) {
                        if (this.ball.color == obstacle.colors[i]) {
                            score = Math.floor(this.ball.score / 200 - 1);
                        } else {
                            ajax();
                            state = 2;
                        }
                    }
                    if (this.ball.x + this.ball.size >= obstacle.x2[obstacle.direction] + ((obstacle.cwidth / 4) * i) &&
                        this.ball.x <= obstacle.x2[obstacle.direction] + ((obstacle.cwidth / 4) * i) + obstacle.width &&
                        this.ball.y + this.ball.size >= obstacle.y &&
                        this.ball.y <= obstacle.y + obstacle.height) {
                        if (this.ball.color == obstacle.colors[i]) {
                            score = Math.floor(this.ball.score / 200 - 1);
                        } else {
                            ajax();
                            state = 2;
                        }
                    }
                }
            });
        }
        resetGame(){
            score = 0;
            this.ball.x = (this.cwidth - this.ball.size) / 2;
            this.ball.y = this.cheight - this.ball.size;
            this.ball.obstacleCreation = 0;
            this.ball.score = 0;
            this.ball.color = colors[selectedColor].ballColor;
            for(let i=0; i<this.obstacles.length; i++){
                this.obstacles.pop();
            }
            this.obstacles = this.obstacles.filter(() => false);
            this.obstacleY = this.cheight - 450;
            this.createObstacle();
            this.obstacleY -= 200;
        }
    }

    class Ball {
        constructor(color, cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.size = 15;
            this.x = (this.cwidth/2)-(this.size/2);
            this.y = this.cheight - this.size;
            this.color = color;
            this.velocity = 0;
            this.gravity = 0.7;
            this.obstacleCreation = 0;
            this.score = 0;
        }
        update() {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y + this.size > this.cheight) {
                this.y = this.cheight - this.size;
                this.velocity = 0;
            }
            this.obstacleCreation -= this.velocity;
            this.score -= this.velocity;
        }
        draw(camera) {
            ctx.save();
            ctx.translate(0, -camera.y);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
        flap() {
            this.velocity = -10;
            flapSound.pause();
            flapSound.currentTime = 0;
            flapSound.play();
        }
    }

    class Camera {
        constructor(cwidth, cheight) {
            this.y = 0;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.interpolationSpeed = 0.1;
        }
        follow(ball) {
            let targetY;
            if (ball.y <= this.cheight / 2) {
                targetY = ball.y - this.cheight / 2;
            } else {
                targetY = 0;
            }
            
            this.y += (targetY - this.y) * this.interpolationSpeed;
        }
    }

    class Background {
        constructor(color1, color2, cwidth, cheight) {
            this.color1 = color1;
            this.color2 = color2;
            this.x = 0;
            this.y = 0;
            this.cwidth = cwidth;
            this.cheight = cheight;
        }
      
        draw() {
            const gradient = ctx.createLinearGradient(this.x, this.y, 0, this.cheight);
            gradient.addColorStop(0, this.color1);
            gradient.addColorStop(1, this.color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, this.y, this.cwidth, this.cheight);
        }
    }

    class Obstacle {
        constructor(colors, y, cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.colors = colors;
            this.x1 = 0;
            this.x2 = [this.cwidth, -this.cwidth];
            this.y = y;
            this.width = this.cwidth / 4;
            this.height = 20;
            this.speed = Math.random() * 4 + 2;
            this.direction = Math.round(Math.random());
        }
        update() {
            if(this.direction == 0) {
                if(this.x1 < -this.cwidth){
                    this.x1 = this.cwidth + this.x2[this.direction] - this.speed;
                } else {
                    this.x1 -= this.speed;
                }
                if(this.x2[this.direction] < -this.cwidth){
                    this.x2[this.direction] = this.cwidth + this.x1 - this.speed;
                } else {
                    this.x2[this.direction] -= this.speed;
                }
            }
            if(this.direction == 1) {
                if(this.x1 > this.cwidth){
                    this.x1 = -this.cwidth + this.x2[this.direction] + this.speed;
                } else {
                    this.x1 += this.speed;
                }
                if(this.x2[this.direction] > this.cwidth){
                    this.x2[this.direction] = -this.cwidth + this.x1 + this.speed;
                } else {
                    this.x2[this.direction] += this.speed;
                }
            }
        }
        draw(camera) {
            ctx.save();
            ctx.translate(0, -camera.y);
            ctx.fillStyle = this.colors[0];
            ctx.fillRect(this.x1 + 0, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[1];
            ctx.fillRect(this.x1 + 175, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[2];
            ctx.fillRect(this.x1 + 350, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[3];
            ctx.fillRect(this.x1 + 525, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[0];
            ctx.fillRect(this.x2[this.direction] + 0, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[1];
            ctx.fillRect(this.x2[this.direction] + 175, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[2];
            ctx.fillRect(this.x2[this.direction] + 350, this.y, this.width, this.height);
            ctx.fillStyle = this.colors[3];
            ctx.fillRect(this.x2[this.direction] + 525, this.y, this.width, this.height);
            ctx.restore();
        }
    }

    const mygame = new Game(canvas.width, canvas.height);
    const mymenu = new Menu(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    let myhighscore;

    function setHighscore(data) {
        myhighscore = new Highscore(data, canvas.width, canvas.height);
    }

    function ajax() {
        $.ajax({
            type: "POST",
            url: "savegame4.php",
            data: { data: score },
            success: function(response){
                console.log(response);
            }
        });
    }

    function ajax2() {
        $.ajax({
            url: "fetchhighscore4.php",
            dataType: "json",
            success: function(data){
                var myData = data;
                console.log(myData);
                setHighscore(myData);
            }
        });
    }

    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mygame.update();
        mygame.draw();
    }
    
    function renderMenu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mymenu.render();
    }

    function renderHighscore() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myhighscore.render();
    }

    function animate() {
        switch(state) {
            case 1:
                if(switchToGame) {
                    mygame.resetGame();
                    gameSound.play();
                    gameSound.addEventListener("ended", function() {
                        gameSound.currentTime = 0;
                        gameSound.play();
                    });
                    switchToGame = false;
                }
                switchToHighscore = true;
                switchToMenu = true;
                renderGame();
                break;
            case 2:
                if(switchToMenu) {
                    ajax2();
                    gameSound.pause();
                    gameSound.currentTime = 0;
                    menuSound.pause();
                    menuSound.currentTime = 0;
                    switchToMenu = false;
                }
                switchToHighscore = true;
                switchToGame = true;
                renderMenu();
                break;
            case 3:
                if(switchToHighscore) {
                    menuSound.play();
                    menuSound.addEventListener("ended", function() {
                        menuSound.currentTime = 0;
                        menuSound.play();
                    });
                    switchToHighscore = false;
                }
                switchToMenu = true;
                switchToGame = true;
                renderHighscore();
                break;
        }
        requestAnimationFrame(animate);
    }

    canvas.addEventListener("click", function () {
        if (state == 1) {
            mygame.ball.flap();
        }
    });

    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (state == 2) {
            mymenu.handleClick(x, y);
        }
        if (state == 3) {
            myhighscore.handleClick(x, y);
        }
    });

    animate();
}