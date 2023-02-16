window.addEventListener("load", () => {
    let selectedWeapon;
    
    function fetchFromDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch-weapon-game3.php');
        xhr.onload = function () {
            const weaponNumber = JSON.parse(xhr.responseText);
            selectedWeapon = parseInt(weaponNumber);
            ShipDestroyer(selectedWeapon);
        };
        xhr.send();
    }

    fetchFromDatabase();
});

function ShipDestroyer(selectedWeapon) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const startButton = document.getElementById("start-button");
    const backButton = document.getElementById("back-button");
    const leaderboardButton = document.getElementById("leaderboard-button");
    const leaderboardBackground = document.getElementById("leaderboard-background");
    let menuSound = new Audio("assets/Ship Destroyer/Audio/Menu Audio/terradorian theme song.mp3");
    let gameSound = new Audio("assets/Ship Destroyer/Audio/Game Audio/Danish Mega Pony v. 4 OST - Track 05 (Repentant).mp3");
    let buttonSound = new Audio("assets/Ship Destroyer/Audio/Sound Effects/zapsplat_multimedia_button_click_fast_short_002_79286.mp3");
    let explosionSound = new Audio("assets/Ship Destroyer/Audio/Sound Effects/esm_8bit_explosion_heavy_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3");
    let fireSound1 = new Audio("assets/Ship Destroyer/Audio/Sound Effects/zapsplat_comedy_bow_arrow_release.mp3");
    let fireSound2 = new Audio("assets/Ship Destroyer/Audio/Sound Effects/zapsplat_cartoon_high_pitched_ping_twang_prick_poke_003_82981.mp3");
    let fireSound3 = new Audio("assets/Ship Destroyer/Audio/Sound Effects/zapsplat_cartoon_whoosh_fast_pass_19269.mp3");
    let fireSound4 = new Audio("assets/Ship Destroyer/Audio/Sound Effects/zapsplat_cartoon_high_pitched_ping_twang_prick_poke_004_82982.mp3");
    let fireSounds = [fireSound1, fireSound2, fireSound3, fireSound4];
    let score = 0;
    let life = 4;
    let gamestop = true;
    let reset = true;
    let reset2 = true;
    let reset3 = true;

    function saveToDatabase() {
        const weaponNumber = selectedWeapon;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-weapon-game3.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`weapon=${weaponNumber}`);
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
            this.image = document.querySelectorAll("#img");
            this.backButton = {
                image: backButton,
                x: 20,
                y: 20,
                width: 40,
                height: 40
            };
        }

        render() {
            for(let i=0; i<this.image.length; i++) {
                ctx.drawImage(this.image[i], 0, 0, this.cwidth, this.cheight);
            }
            ctx.drawImage(leaderboardBackground, (this.cwidth - 350) / 2, 0, 350, this.cheight);
            ctx.drawImage(this.backButton.image, this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);

            ctx.fillStyle = 'white';
            ctx.font = '14px sans-serif';
            for(let i = 0; i < this.data.length; i++) {
                ctx.textAlign = 'left';
                ctx.fillText(this.data[i].username.toUpperCase(), this.x, this.y + i * 30);
                ctx.textAlign = 'right';
                ctx.fillText(this.data[i].ShipDestroyer, this.x + 240, this.y + i * 30);
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
            this.weapons = document.querySelectorAll("#bullet");
            this.image = document.querySelectorAll("#img");
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
            for(let i=0; i<this.image.length; i++) {
                ctx.drawImage(this.image[i], 0, 0, this.cwidth, this.cheight);
            }

            ctx.font = 'bold 40px arial';
            ctx.fillText('Ship Destroyer', this.x, this.y - 100);

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

            ctx.drawImage(this.weapons[selectedWeapon], 0, 0, 32, 32, this.x - 25, this.y - 25, 50, 50);

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
                selectedWeapon--;
                if (selectedWeapon < 0) {
                    selectedWeapon = this.weapons.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedWeapon++;
                if (selectedWeapon >= this.weapons.length) {
                    selectedWeapon = 0;
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

    class Game {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.ship = new Ship(this.cwidth, this.cheight);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 100;
            this.backgrounds = [];
            this.createBackground();
        }
        update() {
            this.backgrounds.forEach(object => {
                object.update();
            });
            if(life > 0) {
                this.ship.update();
            }
            if(this.enemyTimer == this.enemyInterval){
                this.createEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer++;
            }
            this.enemies.forEach(object => {
                object.update();
                if(object.y > this.cheight){
                    object.delete = true;
                }
            });
            this.collision();
        }
        draw() {
            this.backgrounds.forEach(object => {
                object.draw();
            });
            if(life > 0) {
                this.ship.draw();
            }
            this.enemies.forEach(object => {
                object.draw();
            });
        }
        createEnemy(){
            this.enemies.push(new EnemyShip(this.cwidth, this.cheight));
        }
        createBackground(){
            const img = document.querySelectorAll("#img");
            const speeds = [0.6, 0.8, 1, 1.2, 1.4];
            for(let i=0; i<img.length; i++){
                this.backgrounds.push(new Background(img[i], speeds[i], this.cwidth, this.cheight));
            }
        }
        collision() {
            this.enemies.forEach(enemy => {
                if(
                    this.ship.x + (this.ship.width * 0.25) < enemy.x + (enemy.width * 0.75) &&
                    this.ship.x + (this.ship.width * 0.75) > enemy.x + (enemy.width * 0.25) &&
                    this.ship.y + (this.ship.height * 0.25) < enemy.y + (enemy.height * 0.75) &&
                    this.ship.y + (this.ship.height * 0.75) > enemy.y + (enemy.height * 0.25)
                ){
                    explosionSound.pause();
                    explosionSound.currentTime = 0;
                    explosionSound.play();
                    enemy.delete = true;
                    life--;
                    if (life <= 0) {
                        ajax();
                        gamestop = true;
                    }
                }
        
                enemy.enemyBullets.forEach(bullet => {
                    if(
                        bullet.x + (bullet.width * 0.25) < this.ship.x + (this.ship.width * 0.75) &&
                        bullet.x + (bullet.width * 0.75) > this.ship.x + (this.ship.width * 0.25) &&
                        bullet.y + (bullet.height * 0.25) < this.ship.y + (this.ship.height * 0.75) &&
                        bullet.y + (bullet.height * 0.75) > this.ship.y + (this.ship.height * 0.25)
                    ){
                        bullet.delete = true;
                        life--;
                        if (life <= 0) {
                            explosionSound.pause();
                            explosionSound.currentTime = 0;
                            explosionSound.play();
                            ajax();
                            gamestop = true;
                        }
                    }
                });
                enemy.enemyBullets = enemy.enemyBullets.filter(bullet => !bullet.delete);
            });
        
            this.ship.bullets.forEach(bullet => {
                this.enemies.forEach(enemy => {
                    if(
                        bullet.x + (bullet.width * 0.25) < enemy.x + (enemy.width * 0.75) &&
                        bullet.x + (bullet.width * 0.75) > enemy.x + (enemy.width * 0.25) &&
                        bullet.y + (bullet.height * 0.25) < enemy.y + (enemy.height * 0.75) &&
                        bullet.y + (bullet.height * 0.75) > enemy.y + (enemy.height * 0.25)
                    ){
                        bullet.delete = true;
                        enemy.lives--;
                        if (enemy.lives === 0) {
                            explosionSound.pause();
                            explosionSound.currentTime = 0;
                            explosionSound.play();
                            enemy.delete = true;
                            score++;
                        }
                    }
                });
            });
            this.ship.bullets = this.ship.bullets.filter(bullet => !bullet.delete);
            this.enemies = this.enemies.filter(enemy => !enemy.delete);
        }
    }

    class Ship {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.ship = document.querySelectorAll("#ship");
            this.width = 75;
            this.height = 75;
            this.x = (this.cwidth/2)-(this.width/2);
            this.y = this.cheight - this.height;
            this.isDragging = false;
            this.bullets = [];
            this.bulletTimer = 0;
            this.bulletInterval = 10;
        }
        update(){
            if(this.bulletTimer == this.bulletInterval){
                this.createBullet();
                this.bulletTimer = 0;
            } else {
                this.bulletTimer++;
            }
            this.bullets.forEach(object => {
                object.update();
                if(object.y + object.height < 0){
                    object.delete = true;
                }
            });
            this.bullets = this.bullets.filter(object => !object.delete);
        }
        draw() {
            ctx.drawImage(this.ship[life - 1], this.x, this.y, this.width, this.height);
            this.bullets.forEach(object => {
                object.draw();
            });
        }
        dragStart(e) {
            this.initialX = e.clientX - this.x;
            this.initialY = e.clientY - this.y;
            this.isDragging = true;
        }
        dragEnd(e) {
            this.isDragging = false;
        }
        drag(e) {
            if (this.isDragging) {
                e.preventDefault();
                this.currentX = e.clientX;
                this.currentY = e.clientY;
                this.x = this.currentX - this.initialX;
                this.y = this.currentY - this.initialY;
                if (this.x < 0) {
                    this.x = 0;
                }
                if (this.y < 0) {
                    this.y = 0;
                }
                if (this.x + this.width > this.cwidth) {
                    this.x = this.cwidth - this.width;
                }
                if (this.y + this.height > this.cheight) {
                    this.y = this.cheight - this.height;
                }
                if (this.currentY < this.y + this.height && this.currentY > this.y) {
                    if(life > 0) {
                        this.draw();
                    }
                }
            }
        }
        createBullet() {
            this.bullets.push(new Bullet(this.x + (this.width/2), this.y, this.width, this.height));
            fireSounds[selectedWeapon].pause();
            fireSounds[selectedWeapon].currentTime = 0;
            fireSounds[selectedWeapon].play();
        }
    }

    class Bullet {
        constructor(x, y, cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.width = 25;
            this.height = 25;
            this.x = x - (this.width/2);
            this.y = y;
            this.bulletType = document.querySelectorAll("#bullet");
            this.sx = 32;
            this.sy = 0;
            this.sw = 32;
            this.sh = 32;
            this.delete = false;
            this.crop = 0;
            this.cropTimer = 0;
            this.cropInterval = 20;
            this.cropNumber = this.getCropNumber();
        }
        update() {
            this.y -= 3;
            this.crops();
        }
        draw() {
            ctx.drawImage(this.bulletType[selectedWeapon], this.sx * this.crop, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height)
        }
        crops(){
            if(this.cropTimer == this.cropInterval){
                if(this.crop >= this.cropNumber){
                    this.crop = 0;
                } else {
                    this.crop++;
                }
                this.cropTimer = 0;
            } else {
                this.cropTimer++;
            }
        }
        getCropNumber() {
            switch(selectedWeapon) {
                case 0:
                    return 3;
                case 1:
                    return 9;
                case 2:
                    return 2;
                case 3:
                    return 7;
            }
        }
    }

    class EnemyShip {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.enemyship = document.querySelectorAll("#shipflip");
            this.width = 75;
            this.height = 75;
            this.x = (Math.random() * (this.cwidth - 100)) - (this.width/2) + 50;
            this.y = 0 - this.height;
            this.speed = Math.random() * 1 + 1;
            this.delete = false;
            this.enemyBullets = [];
            this.enemyBulletTimer = 0;
            this.enemyBulletInterval = Math.floor(Math.random() * 100 + 150);
            this.lives = 4;
        }
        update(){
            this.y += this.speed * 0.3;
            if(this.enemyBulletTimer == this.enemyBulletInterval){
                this.createEnemyBullet();
                this.enemyBulletTimer = 0;
            } else {
                this.enemyBulletTimer++;
            }
            this.enemyBullets.forEach(object => {
                object.update();
                if(object.y > this.cheight){
                    object.delete = true;
                }
            });
            this.enemyBullets = this.enemyBullets.filter(object => !object.delete);
        }
        draw(){
            ctx.drawImage(this.enemyship[this.lives - 1], this.x, this.y, this.width, this.height);
            this.enemyBullets.forEach(object => {
                object.draw();
            });
        }
        createEnemyBullet() {
            this.enemyBullets.push(new EnemyBullet(this.x + (this.width/2), this.y + this.height, this.width, this.height));
        }
    }

    class EnemyBullet {
        constructor(x, y, cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.width = 25;
            this.height = 25;
            this.x = x - (this.width/2);
            this.y = y;
            this.bulletType = document.querySelectorAll("#bulletflip");
            this.sx = 32;
            this.sy = 0;
            this.sw = 32;
            this.sh = 32;
            this.delete = false;
            this.crop = 0;
            this.cropTimer = 0;
            this.cropInterval = 20;
            this.cropNumber = this.getCropNumber();
        }
        update() {
            this.y += 3;
            this.crops();
        }
        draw() {
            ctx.drawImage(this.bulletType[selectedWeapon], this.sx * this.crop, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height)
        }
        crops(){
            if(this.cropTimer == this.cropInterval){
                if(this.crop >= this.cropNumber){
                    this.crop = 0;
                } else {
                    this.crop++;
                }
                this.cropTimer = 0;
            } else {
                this.cropTimer++;
            }
        }
        getCropNumber() {
            switch(selectedWeapon) {
                case 0:
                    return 3;
                case 1:
                    return 9;
                case 2:
                    return 2;
                case 3:
                    return 7;
            }
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
        score = 0;
        life = 4;
        for(let i=0; i<3; i++){
            mygame.backgrounds[i].x1 = 0;
            mygame.backgrounds[i].x2 = mygame.backgrounds[i].width;
        }
        mygame.ship.x = (canvas.width/2)-(mygame.ship.width/2);
        mygame.ship.y = canvas.height - mygame.ship.height;
        mygame.ship.bulletTimer = 0;
        for(let j=0; j<mygame.ship.bullets.length; j++){
            mygame.ship.bullets.pop();
        }
        mygame.ship.bullets = mygame.ship.bullets.filter(() => false);
        mygame.enemyTimer = 0;
        for(let j=0; j<mygame.enemies.length; j++){
            mygame.enemies.pop();
        }
        mygame.enemies = mygame.enemies.filter(() => false);
        
        mygame.ship.createBullet();
        mygame.createEnemy();
    }

    function ajax() {
        $.ajax({
            type: "POST",
            url: "savegame3.php",
            data: { data: score },
            success: function(response){
                console.log(response);
            }
        });
    }

    function ajax2() {
        $.ajax({
            url: "fetchhighscore3.php",
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
                menuSound.play();
                menuSound.addEventListener("ended", function() {
                    menuSound.currentTime = 0;
                    menuSound.play();
                });
                renderHighscore();
            } else {
                menuSound.pause();
                menuSound.currentTime = 0;
                renderMenu();
            }
        }
        requestAnimationFrame(animate);
    }
 
    canvas.addEventListener("mousedown", mygame.ship.dragStart.bind(mygame.ship));
    canvas.addEventListener("mouseup", mygame.ship.dragEnd.bind(mygame.ship));
    canvas.addEventListener("mouseout", mygame.ship.dragEnd.bind(mygame.ship));
    canvas.addEventListener("mousemove", mygame.ship.drag.bind(mygame.ship));

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