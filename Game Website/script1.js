window.addEventListener("load", () => {
    let selectedTheme;
    
    function fetchFromDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch-theme-game1.php');
        xhr.onload = function () {
            const themeNumber = JSON.parse(xhr.responseText);
            selectedTheme = parseInt(themeNumber);
            FruitCatch(selectedTheme);
        };
        xhr.send();
    }

    fetchFromDatabase();
});

function FruitCatch(selectedTheme) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img1 = document.querySelectorAll("#img1");
    const img2 = document.querySelectorAll("#img2");
    const img3 = document.querySelectorAll("#img3");
    const theme = [img1, img2, img3];
    const startButton = document.getElementById("start-button");
    const backButton = document.getElementById("back-button");
    const leaderboardButton = document.getElementById("leaderboard-button");
    const leaderboardBackground = document.getElementById("leaderboard-background");
    let menuSound = new Audio("assets/Fruit Catch/Audio/Menu Audio/Toes and Water.mp3");
    let gameSound = new Audio("assets/Fruit Catch/Audio/Game Audio/Danish Mega Pony v. 4 OST - Track 02 (Fire Level).mp3");
    let buttonSound = new Audio("assets/Fruit Catch/Audio/Sound Effects/zapsplat_multimedia_button_click_fast_short_002_79286.mp3");
    let collisionSound = new Audio("assets/Fruit Catch/Audio/Sound Effects/zapsplat_cartoon_very_fast_whoosh_swoosh_swipe_or_snatch_002_89381.mp3");
    let score = 0;
    let life = 3;
    let gamestop = true;
    let reset = true;
    let reset2 = true;
    let reset3 = true;
    
    function saveToDatabase() {
        const themeNumber = selectedTheme;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-theme-game1.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`theme=${themeNumber}`);
    }
    
    window.onbeforeunload = function() {
        saveToDatabase();
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
            ctx.font = '14px sans-serif';
            for(let i = 0; i < this.data.length; i++) {
                ctx.textAlign = 'left';
                ctx.fillText(this.data[i].username.toUpperCase(), this.x, this.y + i * 30);
                ctx.textAlign = 'right';
                ctx.fillText(this.data[i].FruitCatch, this.x + 240, this.y + i * 30);
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
                reset3 = true;
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

            ctx.font = 'bold 40px arial';
            ctx.fillText('Fruit Catch', this.x, this.y - 100);

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
            ctx.font = 'bold 20px arial';
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
                gamestop = false;
            }
            
            if (x > this.leaderboardButton.x && 
                x < this.leaderboardButton.x + this.leaderboardButton.width && 
                y > this.leaderboardButton.y && 
                y < this.leaderboardButton.y + this.leaderboardButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                reset3 = false;
            }
        }
    }

    class InputHandler {
        constructor(){
            this.speed = 0;
            window.addEventListener("keydown", (e) => {
                switch(e.key){
                    case "ArrowLeft":
                        this.speed = -8;
                        break;
                    case "ArrowRight":
                        this.speed = 8;
                        break;
                }
            });
            window.addEventListener("keyup", (e) => {
                switch(e.key){
                    case "ArrowLeft":
                        this.speed = 0;
                        break;
                    case "ArrowRight":
                        this.speed = 0;
                        break;
                }
            });
        }
    }
    
    class Game {
        constructor(cwidth, cheight){
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.foods = [];
            this.backgrounds = [];
            this.foodTimer = 0;
            this.foodInterval = 100;
            this.basket = new Basket(this.cwidth, this.cheight);
        }
        update(){
            this.backgrounds.forEach(object => {
                object.update();
            });
            if(this.foodTimer == this.foodInterval){
                this.createFood();
                this.foodTimer = 0;
            } else {
                this.foodTimer++;
            }
            this.foods.forEach(object => {
                object.update();
            });
            this.foods = this.foods.filter(object => !object.delete);
            this.basket.update();
            this.collision();
        }
        draw(){
            this.backgrounds.forEach(object => {
                object.draw();
            });
            this.foods.forEach(object => {
                object.draw();
            });
            this.basket.draw();
        }
        collision(){
            this.foods.forEach(object => {
                if(object.y > this.cheight){
                    object.delete = true;
                    life--;
                    if(life <= 0){
                        ajax();
                        gamestop = true;
                    }
                }
                if(
                    this.basket.x + this.basket.width * 0.5 < object.x + object.width &&
                    this.basket.x + this.basket.width * 0.5 > object.x &&
                    this.basket.y + this.basket.height * 0.5 < object.y + object.height &&
                    this.basket.y + this.basket.height * 0.5 > object.y
                ){
                    collisionSound.pause();
                    collisionSound.currentTime = 0;
                    collisionSound.play();
                    object.delete = true;
                    score++;
                }
            });
        }
        createFood(){
            this.foods.push(new Food(this.cwidth, this.cheight));
        }
        createBackground(){
            const img = theme[selectedTheme];
            const speeds = [0.6, 0.8, 1, 1.2, 1.4];
            for(let i=0; i<img.length; i++){
                this.backgrounds.push(new Background(img[i], speeds[i], this.cwidth, this.cheight));
            }
        }
    }

    class Food {
        constructor(cwidth, cheight){
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.sx = Math.floor(Math.random() * 5) * 32;
            this.sy = Math.floor(Math.random() * 4) * 32;
            this.food = document.getElementById("food");
            this.sw = 32;
            this.sh = 32;
            this.width = 100;
            this.height = 100;
            this.x = (Math.random() * this.cwidth) - (this.width/2);
            this.y = 0 - this.height;
            this.speed = Math.random() * 1 + 1;
            this.delete = false;
        }
        update(){
            this.y += this.speed;
        }
        draw(){
            ctx.drawImage(this.food, this.sx ,this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
        }
    }

    class Basket extends InputHandler {
        constructor(cwidth, cheight){
            super();
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.basket = document.getElementById("basket");
            this.width = 150;
            this.height = 150;
            this.x = (this.cwidth/2)-(this.width/2);
            this.y = this.cheight - this.height;
        }
        update(){
            if(this.x > this.cwidth){
                this.x = 0 - this.width;
            }
            if(this.x + this.width < 0){
                this.x = this.cwidth;
            }
            this.x += this.speed;
        }
        draw(){
            ctx.drawImage(this.basket, this.x, this.y, this.width, this.height);
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

    function setHighscore(data) {
        myhighscore = new Highscore(data, canvas.width, canvas.height);
    }

    function resetGame(){
        mygame.createBackground();
        score = 0;
        life = 3;
        for(let i=0; i<5; i++){
            mygame.backgrounds[i].x1 = 0;
            mygame.backgrounds[i].x2 = mygame.backgrounds[i].width;
        }
        mygame.basket.x = (canvas.width/2)-(mygame.basket.width/2);
        mygame.foodTimer = 0;
        for(let j=0; j<mygame.foods.length; j++){
            mygame.foods.pop();
        }
        mygame.foods = mygame.foods.filter(() => false);  
        mygame.createFood();

    }

    function ajax() {
        $.ajax({
            type: "POST",
            url: "savegame1.php",
            data: { data: score },
            success: function(response){
                console.log(response);
            }
        });
    }

    function ajax2() {
        $.ajax({
            url: "fetchhighscore1.php",
            dataType: "json",
            success: function(data){
                var myData = data;
                console.log(myData);
                setHighscore(myData);
            }
        });
    }

    function showScore(){
        ctx.font = '20px sans-serif';
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 50, 30);
        ctx.fillText("Life: " + life, 50, 55);
    }
    
    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mygame.update();
        mygame.draw();
        showScore();
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
        if (!gamestop) {
            if (reset) {
                resetGame();
                gameSound.play();
                gameSound.addEventListener("ended", function() {
                    gameSound.currentTime = 0;
                    gameSound.play();
                });
                reset = false;
            }
            reset2 = true;
            renderGame();
        } else {
            if (reset2) {
                gameSound.pause();
                gameSound.currentTime = 0;
                ajax2();
                reset2 = false;
            }
            reset = true;
            if (!reset3) {
                renderHighscore();
                menuSound.play();
                menuSound.addEventListener("ended", function() {
                    menuSound.currentTime = 0;
                    menuSound.play();
                });
            } else {
                menuSound.pause();
                menuSound.currentTime = 0;
                renderMenu();
            }
        }
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (gamestop && reset3) {
            mymenu.handleClick(x, y);
        }
        if (gamestop && !reset3) {
            myhighscore.handleClick(x, y);
        }
    });

    animate();
}