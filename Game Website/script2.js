window.addEventListener("load", () => {
    let selectedTheme;
    
    function fetchFromDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch-theme-game2.php');
        xhr.onload = function () {
            const themeNumber = JSON.parse(xhr.responseText);
            selectedTheme = parseInt(themeNumber);
            BalloonPop(selectedTheme);
        };
        xhr.send();
    }

    fetchFromDatabase();
});

function BalloonPop(selectedTheme) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img1 = document.querySelectorAll("#img1");
    const img2 = document.querySelectorAll("#img2");
    const img3 = document.querySelectorAll("#img3");
    const theme = [img1, img2, img3];
    const startButton = document.getElementById("start-button");
    const backButton = document.getElementById("back-button");
    const leaderboardButton = document.getElementById("leaderboard-button");
    const continueButton = document.getElementById("continue-button");
    const restartButton = document.getElementById("restart-button");
    const homeButton = document.getElementById("home-button");
    const leaderboardBackground = document.getElementById("leaderboard-background");
    let menuSound = new Audio("assets/Balloon Pop/Audio/Menu Audio/Harp.mp3");
    let gameSound = new Audio("assets/Balloon Pop/Audio/Game Audio/karma.wav");
    let buttonSound = new Audio("assets/Balloon Pop/Audio/Sound Effects/zapsplat_multimedia_button_click_fast_short_002_79286.mp3");
    let collisionSound = new Audio("assets/Balloon Pop/Audio/Sound Effects/esm_8bit_explosion_heavy_with_voice_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3");
    let score = 0;
    let life = 3;
    let state = 2;
    let switchToGame = true;
    let switchToMenu = true;
    let switchToHighscore = true;
    let switchToPause = true;
    let continued = true;

    function saveToDatabase() {
        const themeNumber = selectedTheme;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-theme-game2.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`theme=${themeNumber}`);
    }
    
    window.onbeforeunload = function() {
        saveToDatabase();
    }

    class Pause {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.x = this.cwidth / 2;
            this.y = this.cheight / 2;
            this.themes = document.querySelectorAll("#theme");
            this.continueButton = {
                image: continueButton,
                width: 40,
                height: 40,
                x: this.cwidth - 60,
                y: 20
            };
            this.restartButton = {
                image: restartButton,
                width: 40,
                height: 40,
                x: this.cwidth - 60,
                y: 70
            };
            this.homeButton = {
                image: homeButton,
                width: 40,
                height: 40,
                x: this.cwidth - 60,
                y: 120
            };
        }

        render() {
            ctx.drawImage(this.themes[selectedTheme], 0, 0, this.cwidth, this.cheight);
            ctx.drawImage(this.continueButton.image, this.continueButton.x, this.continueButton.y, this.continueButton.width, this.continueButton.height);
            ctx.drawImage(this.restartButton.image, this.restartButton.x, this.restartButton.y, this.restartButton.width, this.restartButton.height);
            ctx.drawImage(this.homeButton.image, this.homeButton.x, this.homeButton.y, this.homeButton.width, this.homeButton.height);

            ctx.textAlign = 'center';
            ctx.font = 'bold 40px impact';
            ctx.fillText('PAUSED', this.x, this.y);
        }

        handleClick(x, y) {
            if (x > this.continueButton.x && 
                x < this.continueButton.x + this.continueButton.width && 
                y > this.continueButton.y && 
                y < this.continueButton.y + this.continueButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                continued = false;
                state = 1;
            }

            if (x > this.restartButton.x && 
                x < this.restartButton.x + this.restartButton.width && 
                y > this.restartButton.y && 
                y < this.restartButton.y + this.restartButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 1;
            }
            
            if (x > this.homeButton.x && 
                x < this.homeButton.x + this.homeButton.width && 
                y > this.homeButton.y && 
                y < this.homeButton.y + this.homeButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 2;
            }
        }
    }

    class Highscore {
        constructor(data, cwidth, cheight) {
            this.x = 260;
            this.y = 175;
            this.data = data;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.themes = document.querySelectorAll("#theme");
            this.backButton = {
                image: backButton,
                x: 20,
                y: 20,
                width: 40,
                height: 40
            };
        }

        render() {
            ctx.drawImage(this.themes[selectedTheme], 0, 0, this.cwidth, this.cheight);
            ctx.drawImage(leaderboardBackground, (this.cwidth - 350) / 2, 0, 350, this.cheight);
            ctx.drawImage(this.backButton.image, this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);

            ctx.fillStyle = 'white';
            ctx.font = '14px impact';
            for(let i = 0; i < this.data.length; i++) {
                ctx.textAlign = 'left';
                ctx.fillText(this.data[i].username.toUpperCase(), this.x, this.y + i * 30);
                ctx.textAlign = 'right';
                ctx.fillText(this.data[i].BalloonPop, this.x + 240, this.y + i * 30);
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
            this.themes = document.querySelectorAll("#theme");
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
            ctx.fillStyle = 'black';
            ctx.drawImage(this.themes[selectedTheme], 0, 0, this.cwidth, this.cheight);

            ctx.font = 'bold 40px impact';
            ctx.fillText('BALLOON POP', this.x, this.y - 100);

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

            ctx.fillText(selectedTheme + 1, this.x, this.y);

            ctx.drawImage(this.leaderboardButton.image, this.leaderboardButton.x, this.leaderboardButton.y, this.leaderboardButton.width, this.leaderboardButton.height);
            ctx.drawImage(this.startButton.image, this.startButton.x - this.startButton.width / 2, this.startButton.y - this.startButton.height / 2, this.startButton.width, this.startButton.height);
            ctx.font = 'bold 20px impact';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        }
          
        handleClick(x, y) {
            if (x >= this.x - 100 && x <= this.x - 50 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedTheme--;
                if (selectedTheme < 0) {
                    selectedTheme = this.themes.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedTheme++;
                if (selectedTheme >= this.themes.length) {
                    selectedTheme = 0;
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
        constructor(cwidth, cheight){
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.backgrounds = [];
            this.balloons = [];
            this.explosions = [];
            this.balloonInterval = 30;
            this.balloonTimer = 0;
            this.backButton = {
                image: backButton,
                x: this.cwidth - 60,
                y: 20,
                width: 40,
                height: 40
            }
        }
        update(){
            this.backgrounds.forEach(object => {
                object.update();
            });
            if(this.balloonTimer == this.balloonInterval){
                this.createBalloon();
                this.balloonTimer = 0;
            } else {
                this.balloonTimer++;
            }
            this.balloons.forEach(object => {
                object.update();
                if (object.y + object.height < 0) {
                    object.delete = true;
                    life--;
                    if (life <= 0) {
                        ajax();
                        state = 2;
                    }
                }
            });
            this.explosions.forEach(object => {
                object.update();
            });
            this.balloons = this.balloons.filter(object => !object.delete);
            this.explosions = this.explosions.filter(object => !object.delete);
        }
        draw(){
            this.backgrounds.forEach(object => {
                object.draw();
            });
            this.balloons.forEach(object => {
                object.draw();
            });
            this.explosions.forEach(object => {
                object.draw();
            });

            ctx.drawImage(this.backButton.image, this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);

            ctx.font = '20px impact';
            ctx.fillStyle = "black";
            ctx.fillText("SCORE: " + score, 50, 30);
            ctx.fillText("LIFE: " + life, 50, 55);
        }
        createBalloon(){
            const bln = document.querySelectorAll("#bln");
            this.balloons.push(new Balloon(bln[Math.floor(Math.random()*5)], this.cwidth, this.cheight));
        }
        createBackground(){
            const img = theme[selectedTheme];
            const speeds = [1, 1.2, 1.4];
            for(let i=0; i<3; i++){
                this.backgrounds.push(new Background(img[i], speeds[i], this.cwidth, this.cheight));
            }
        }
        collision(x, y) {
            let deleted = false;
            this.balloons.forEach((object) => {
                if (!object.delete && !deleted) {
                    if (x >= object.x &&
                        x <= object.width + object.x &&
                        y >= object.y &&
                        y <= object.height + object.y
                    ) {
                        collisionSound.pause();
                        collisionSound.currentTime = 0;
                        collisionSound.play();
                        object.delete = true;
                        score++;
                        this.explosions.push(new Explosion(object.image, object.x, object.y, object.width, object.height));
                        deleted = true;
                    }
                }
            });
        }
        resetGame(){
            this.createBackground();
            score = 0;
            life = 3;
            for(let i=0; i<3; i++){
                this.backgrounds[i].x1 = 0;
                this.backgrounds[i].x2 = this.backgrounds[i].width;
            }
            this.balloonTimer = 0;
            for(let j=0; j<this.balloons.length; j++){
                this.balloons.pop();
            }
            this.balloons = this.balloons.filter(() => false);
            this.createBalloon();
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
                state = 4;
            }
        }
    }

    class Balloon {
        constructor(image, cwidth, cheight){
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.crop = Math.floor(Math.random() * 3);
            this.cropTimer = 0;
            this.cropInterval = 20;
            this.sw = 16;
            this.sh = 32;
            this.sy = 0;
            this.width = 50;
            this.height = 100;
            this.x = (Math.random() * this.cwidth) - (this.width/2);
            this.y = this.cheight;
            this.image = image;
            this.speed = Math.random() * 1 + 1;
            this.sx = 16;
            this.delete = false;
        }
        update(){
            this.y -= this.speed;
            this.crops();
        }
        draw(){
            ctx.drawImage(this.image, this.sx * this.crop, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
        }
        crops(){
            if(this.cropTimer == this.cropInterval){
                if(this.crop >= 2){
                    this.crop = 0;
                } else {
                    this.crop++;
                }
                this.cropTimer = 0;
            } else {
                this.cropTimer++;
            }
        }
    }

    class Explosion {
        constructor(image, x, y, width, height){
            this.image = image;
            this.sx = 0;
            this.sy = 32;
            this.sw = 16;
            this.sh = 32;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.delete = false;
            this.popTimer = 0;
            this.popInterval = 3;
        }
        update(){
            if(this.popTimer == this.popInterval){
                if(this.sx >= 2){
                    this.delete = true;
                } else {
                    this.sx++;
                }
                this.popTimer = 0;
            } else {
                this.popTimer++;
            }
        }
        draw(){
            ctx.drawImage(this.image, this.sx * 16, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
        }
    }

    class Background {
        constructor(image, speed, cwidth, cheight){
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.image = image;
            this.x1 = 0;
            this.y = 0;
            this.width = this.cwidth;
            this.height = this.cheight;
            this.x2 = this.width;
            this.speed = speed;
        }
        update(){
            if(this.x1 < -this.width){
                this.x1 = this.width + this.x2 - this.speed;
            } else {
                this.x1 -= this.speed;
            }
            if(this.x2 < -this.width){
                this.x2 = this.width + this.x1 - this.speed;
            } else {
                this.x2 -= this.speed;
            }
        }
        draw(){
            ctx.drawImage(this.image, this.x1, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }

    const mygame = new Game(canvas.width, canvas.height);
    const mymenu = new Menu(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    let myhighscore;
    const mypause = new Pause(canvas.width, canvas.height);

    function setHighscore(data) {
        myhighscore = new Highscore(data, canvas.width, canvas.height);
    }

    function ajax() {
        $.ajax({
            type: "POST",
            url: "savegame2.php",
            data: { data: score },
            success: function(response){
                console.log(response);
            }
        });
    }

    function ajax2() {
        $.ajax({
            url: "fetchhighscore2.php",
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

    function renderPause() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mypause.render();
    }

    function animate() {
        switch(state) {
            case 1:
                if(switchToGame) {
                    if(continued) {
                        mygame.resetGame();
                        gameSound.currentTime = 0;
                    }
                    gameSound.play();
                    gameSound.addEventListener("ended", function() {
                        gameSound.currentTime = 0;
                        gameSound.play();
                    });
                    switchToGame = false;
                    continued = true;
                }
                switchToPause = true;
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
                switchToPause = true;
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
                switchToPause = true;
                switchToMenu = true;
                switchToGame = true;
                renderHighscore();
                break;
            case 4:
                if(switchToPause) {
                    gameSound.pause();
                    switchToPause = false;
                }
                switchToHighscore = true;
                switchToMenu = true;
                switchToGame = true;
                renderPause();
                break;
        }
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mygame.collision(x, y);
    });

    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        switch(state) {
            case 1:
                mygame.handleClick(x, y);
                break;
            case 2:
                mymenu.handleClick(x, y);
                break;
            case 3:
                myhighscore.handleClick(x, y);
                break;
            case 4:
                mypause.handleClick(x, y);
                break;
        }
    });

    animate();
}