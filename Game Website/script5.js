window.addEventListener("load", () => {
    let selectedIcon;
    let selectedBackground;
    let selectedGround;
    
    function fetchFromDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch-component-game5.php');
        xhr.onload = function () {
            const components = JSON.parse(xhr.responseText);
            selectedIcon = parseInt(components.Game5Icon);
            selectedBackground = parseInt(components.Game5BG);
            selectedGround = parseInt(components.Game5Ground);
            CubeJump(selectedIcon, selectedBackground, selectedGround);
        };
        xhr.send();
    }

    fetchFromDatabase();
});

function CubeJump(selectedIcon, selectedBackground, selectedGround) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const tiles = document.querySelectorAll("#tile");
    const startButton = document.getElementById("start-button");
    const backButton = document.getElementById("back-button");
    const leaderboardButton = document.getElementById("leaderboard-button");
    const settingsButton = document.getElementById("settings-button");
    const leaderboardBackground = document.getElementById("leaderboard-background");
    let menuSound = new Audio("assets/Cube Jump/Audio/Menu Audio/Decision.mp3");
    let gameSound = new Audio("assets/Cube Jump/Audio/Game Audio/Theme Song 8-bit V1 _looping.wav");
    let buttonSound = new Audio("assets/Cube Jump/Audio/Sound Effects/zapsplat_multimedia_button_click_fast_short_002_79286.mp3");
    let jumpSound = new Audio("assets/Cube Jump/Audio/Sound Effects/zapsplat_cartoon_high_pitched_twang_prick_poke_spring_007_72923.mp3");
    let score = 0;
    let state = 2;
    let switchToGame = true;
    let switchToMenu = true;
    let switchToHighscore = true;
    let switchToSettings = true;
    let markForJump = false;

    function saveToDatabase() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-component-game5.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`icon=${selectedIcon}&background=${selectedBackground}&ground=${selectedGround}`);
    }
    
    window.onbeforeunload = function() {
        saveToDatabase();
    }

    const icons = [];
    const backgrounds = [];
    const grounds = [];

    for(let i = 0; i < 149; i++) {
        icons.push(new Image());
        icons[i].src = `assets/Cube Jump/Player Icons/icon_${i}.png`;
    }
    for(let i = 0; i < 5; i++) {
        backgrounds.push(new Image());
        backgrounds[i].src = `assets/Cube Jump/Backgrounds/game_bg_0${i + 1}_001-hd.png`;
    }
    for(let i = 0; i < 5; i++) {
        grounds.push(new Image());
        grounds[i].src = `assets/Cube Jump/Grounds/groundSquare_0${i + 1}_001-hd.png`;
    }

    class Settings {
        constructor(x, y, cwidth, cheight) {
            this.x = x;
            this.y1 = y - 75;
            this.y2 = y + 75;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.background = new Background(this.cwidth, this.cheight);
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

            ctx.font = 'bold 40px arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';

            ctx.fillText('Background', this.x, this.y1 - 65);
            ctx.beginPath();
            ctx.moveTo(this.x - 75, this.y1);
            ctx.lineTo(this.x - 50, this.y1 - 25);
            ctx.lineTo(this.x - 50, this.y1 + 25);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x + 75, this.y1);
            ctx.lineTo(this.x + 50, this.y1 - 25);
            ctx.lineTo(this.x + 50, this.y1 + 25);
            ctx.fill();

            ctx.fillText('Ground', this.x, this.y2 - 65);
            ctx.beginPath();
            ctx.moveTo(this.x - 75, this.y2);
            ctx.lineTo(this.x - 50, this.y2 - 25);
            ctx.lineTo(this.x - 50, this.y2 + 25);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x + 75, this.y2);
            ctx.lineTo(this.x + 50, this.y2 - 25);
            ctx.lineTo(this.x + 50, this.y2 + 25);
            ctx.fill();

            ctx.fillText(selectedBackground + 1, this.x, this.y1);
            ctx.fillText(selectedGround + 1, this.x, this.y2);

            ctx.drawImage(this.backButton.image, this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);
        }

        handleClick(x, y) {
            if (x >= this.x - 100 && x <= this.x - 50 && y >= this.y1 - 50 && y <= this.y1 + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedBackground--;
                if (selectedBackground < 0) {
                    selectedBackground = backgrounds.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y1 - 50 && y <= this.y1 + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedBackground++;
                if (selectedBackground >= backgrounds.length) {
                    selectedBackground = 0;
                }
            }

            if (x >= this.x - 100 && x <= this.x - 50 && y >= this.y2 - 50 && y <= this.y2 + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedGround--;
                if (selectedGround < 0) {
                    selectedGround = grounds.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y2 - 50 && y <= this.y2 + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedGround++;
                if (selectedGround >= grounds.length) {
                    selectedGround = 0;
                }
            }

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

    class Highscore {
        constructor(data, cwidth, cheight) {
            this.x = 260;
            this.y = 175;
            this.data = data;
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.background = new Background(this.cwidth, this.cheight);
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
                ctx.fillText(this.data[i].CubeJump, this.x + 240, this.y + i * 30);
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
            this.background = new Background(this.cwidth, this.cheight);
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
            this.settingsButton = {
                image: settingsButton,
                x: this.cwidth - 60,
                y: 70,
                width: 40,
                height: 40
            };
        }
  
        render() {
            this.background.draw();
            
            ctx.fillStyle = 'black';

            ctx.font = 'bold 40px arial';
            ctx.fillText('Cube Jump', this.x, this.y - 100);

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

            ctx.drawImage(icons[selectedIcon], this.x - 25, this.y - 25, 50, 50);

            ctx.drawImage(this.leaderboardButton.image, this.leaderboardButton.x, this.leaderboardButton.y, this.leaderboardButton.width, this.leaderboardButton.height);
            ctx.drawImage(this.settingsButton.image, this.settingsButton.x, this.settingsButton.y, this.settingsButton.width, this.settingsButton.height);
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
                selectedIcon--;
                if (selectedIcon < 0) {
                    selectedIcon = icons.length - 1;
                }
            }
          
            if (x >= this.x + 50 && x <= this.x + 100 && y >= this.y - 50 && y <= this.y + 50) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                selectedIcon++;
                if (selectedIcon >= icons.length) {
                    selectedIcon = 0;
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

            if (x > this.settingsButton.x && 
                x < this.settingsButton.x + this.settingsButton.width && 
                y > this.settingsButton.y && 
                y < this.settingsButton.y + this.settingsButton.height
            ) {
                buttonSound.pause();
                buttonSound.currentTime = 0;
                buttonSound.play();
                state = 4;
            }
        }
    }

    class Game {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.cube = new Cube(this.cwidth, this.cheight);
            this.camera = new Camera(this.cwidth, this.cheight);
            this.background = new Background(this.cwidth, this.cheight);
            this.ground = new Ground(this.cwidth, this.cheight);
            this.arrays = [];
            this.combineArrays();
            this.obstacles = [];
            this.obstacleNumber = 0;
        }
        update() {
            this.cube.update();
            this.ground.update(this.camera);
            this.camera.follow(this.cube);
            if(this.cube.obstacleCreation >= 1440){
                this.obstacleNumber += 1;
                this.createObstacle();
                this.cube.obstacleCreation -= 1440;
            }
            this.collision();
        }
        draw() {
            this.background.draw();
            this.ground.draw();
            this.cube.draw(this.camera);
            this.obstacles.forEach(object => {
                object.draw(this.camera);
            });
            
            ctx.font = '20px sans-serif';
            ctx.fillStyle = "white";
            ctx.fillText(score, this.cwidth / 2, 30);
        }
        async fetchArray(file) {
            const response = await fetch(file);
            const text = await response.text();
            const rows = text.split("\n");
            const array = [];
            for (const row of rows) {
                array.push(row.split(",").map(x => parseInt(x, 10)));
            }
            return array;
        }
    
        async createObstacle() {
            Promise.all(this.arrays).then(result => {
                let index = 0;
                if(this.obstacleNumber > 0) {
                    index = Math.floor(Math.random() * 16);
                }
                this.obstacles.push(new Obstacle(result[index], 500 + (this.obstacleNumber * 1440)));
            });
        }
        combineArrays() {
            for (let i = 0; i < 16; i++) {
                this.arrays.push(this.fetchArray(`assets/Cube Jump/Obstacles/Obstacles${i + 1}.csv`));
            }
        }
        collision() {
            this.obstacles.forEach(obstacle => {
                obstacle.blocks.forEach(block => {
                    if (this.cube.isCollidingWithTopOf(block)) {
                        this.cube.y = block.y - this.cube.height;
                    } else if (block.isCollidingWith(this.cube)) {
                        ajax();
                        state = 2;
                    }
                });
                obstacle.spikes.forEach(spike => {
                    if(spike.isCollidingWith(this.cube)) {
                        ajax();
                        state = 2;
                    }
                });
                obstacle.spikesflip.forEach(spike => {
                    if(spike.isCollidingWith(this.cube)) {
                        ajax();
                        state = 2;
                    }
                });
                obstacle.thorns.forEach(thorn => {
                    if(thorn.isCollidingWith(this.cube)) {
                        ajax();
                        state = 2;
                    }
                });
            });
        }
        
        jump() {
            console.log("Is this works");
            this.obstacles.forEach(obstacle => {
                obstacle.blocks.forEach(block => {
                    if (
                        this.cube.y + this.cube.height >= this.cube.cheight - 100 || 
                        this.cube.y == block.y - this.cube.height
                        ) {
                        if (!markForJump) {
                            this.cube.velocity = -26;
                            jumpSound.pause();
                            jumpSound.currentTime = 0;
                            jumpSound.play();
                            markForJump = true;
                        }
                    }
                });
            });
            markForJump = false
        }

        resetGame() {
            score = 0;
            this.ground.x1 = 0;
            this.ground.x2 = this.cwidth;
            this.cube.x = 0 - this.cube.width;
            this.cube.y = this.cheight - this.cube.height - 100;
            this.cube.obstacleCreation = 0;
            this.obstacleNumber = 0;
            this.cube.image = icons[selectedIcon];
            for(let i=0; i<this.obstacles.length; i++){
                this.obstacles.pop();
            }
            this.obstacles = this.obstacles.filter(() => false);
            this.createObstacle();
        }
    }

    class Cube {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.image = icons[selectedIcon];
            this.width = 40;
            this.height = 40;
            this.x = 0 - this.width;
            this.y = this.cheight - this.height - 100;
            this.velocity = 0;
            this.acceleration = 0.7;
            this.resistance = 0.84;
            this.obstacleCreation = 0;
        }
        update() {
            this.x += 4;
            this.obstacleCreation += 4;
            score += 4;
            this.velocity += this.acceleration;
            this.velocity *= this.resistance;
            this.y += this.velocity;
            if (this.y + this.height >= this.cheight - 100) {
                this.y = this.cheight - this.height - 100;
            }
        }
        draw(camera) {
            ctx.save();
            ctx.translate(-camera.x, 0);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.restore();
        }
        isCollidingWithTopOf(block) {
            return (
              this.x + this.width > block.x &&
              this.x < block.x + block.width &&
              this.y + this.height > block.y &&
              this.y + this.height < block.y + block.height
            );
        }
    }

    class Camera {
        constructor(cwidth, cheight) {
            this.x = 0;
            this.speed = 0;
            this.cwidth = cwidth;
            this.cheight = cheight;
        }
        follow(cube) {
            if (cube.x >= 100) {
                this.x = cube.x - 100;
                this.speed = 4;
            } else {
                this.x = 0;
                this.speed = 0;
            }
        }
    }

    class Spike {
        constructor(x, y, width) {
            this.x = (x * 40) + width;
            this.y = (y * 40) + (canvas.height - 340);
            this.width = 40;
            this.height = 40;
            this.image = tiles[2];
            this.hitboxX = this.x + (this.width - this.width / 4) / 2;
            this.hitboxY = this.y + (this.height - this.height / 4) / 2;
            this.hitboxWidth = this.width / 4;
            this.hitboxHeight = this.height / 4;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        isCollidingWith(cube) {
            return (
                cube.x + cube.width > this.hitboxX &&
                cube.x < this.hitboxX + this.hitboxWidth &&
                cube.y + cube.height > this.hitboxY &&
                cube.y < this.hitboxY + this.hitboxHeight
            );
        }
    }

    class SpikeFlip {
        constructor(x, y, width) {
            this.x = (x * 40) + width;
            this.y = (y * 40) + (canvas.height - 340);
            this.width = 40;
            this.height = 40;
            this.image = tiles[1];
            this.hitboxX = this.x + (this.width - this.width / 4) / 2;
            this.hitboxY = this.y + (this.height - this.height / 4) / 2;
            this.hitboxWidth = this.width / 4;
            this.hitboxHeight = this.height / 4;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        isCollidingWith(cube) {
            return (
                cube.x + cube.width > this.hitboxX &&
                cube.x < this.hitboxX + this.hitboxWidth &&
                cube.y + cube.height > this.hitboxY &&
                cube.y < this.hitboxY + this.hitboxHeight
            );
        }
    }

    class Block {
        constructor(x, y, width) {
            this.x = (x * 40) + width;
            this.y = (y * 40) + (canvas.height - 340);
            this.width = 40;
            this.height = 40;
            this.image = tiles[0];
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        isCollidingWith(cube) {
            return (
                cube.x + cube.width > this.x &&
                cube.x < this.x + this.width &&
                cube.y + cube.height > this.y &&
                cube.y < this.y + this.height
            );
        }
    }

    class Thorn {
        constructor(x, y, width) {
            this.x = (x * 40) + width;
            this.y = (y * 40) + (canvas.height - 340) + 20;
            this.width = 40;
            this.height = 40 - 20;
            this.image = tiles[3];
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        isCollidingWith(cube) {
            return (
                cube.x + cube.width > this.x &&
                cube.x < this.x + this.width &&
                cube.y + cube.height > this.y &&
                cube.y < this.y + this.height
            );
        }
    }

    class Obstacle {
        constructor(array, width) {
            this.thorns = [];
            this.blocks = [];
            this.spikes = [];
            this.spikesflip = [];
            this.array = array;
            this.width = width;
            this.createTiles();
        }
        draw(camera) {
            ctx.save();
            ctx.translate(-camera.x, 0);
            this.thorns.forEach(object => {
                object.draw();
            });
            this.blocks.forEach(object => {
                object.draw();
            });
            this.spikes.forEach(object => {
                object.draw();
            });
            this.spikesflip.forEach(object => {
                object.draw();
            });
            ctx.restore();
        }
        createTiles() {
            for (let i=0; i<this.array.length; i++) {
                for (let j=0; j<this.array[i].length; j++) {
                    switch(this.array[i][j]) {
                        case 0:
                            break;
                        case 1:
                            this.blocks.push(new Block(j, i, this.width));
                            break;
                        case 2:
                            this.spikes.push(new Spike(j, i, this.width));
                            break;
                        case 3:
                            this.spikesflip.push(new SpikeFlip(j, i, this.width));
                            break;
                        case 4:
                            this.thorns.push(new Thorn(j, i, this.width));
                            break;
                    }
                }
            }
        }
    
        
    }

    class Background {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.width = 700;
            this.height = 700;
            this.x = 0;
            this.y = 0 - 200;
        }
      
        draw() {
            ctx.drawImage(backgrounds[selectedBackground], this.x, this.y, this.width, this.height);
        }
    }

    class Ground {
        constructor(cwidth, cheight) {
            this.cwidth = cwidth;
            this.cheight = cheight;
            this.x1 = 0;
            this.x2 = this.cwidth;
            this.y = this.cheight - 100;
            this.width = 100;
            this.height = 100;
        }
        update(camera) {
            if(this.x1 < -this.cwidth){
                this.x1 += this.cwidth * 2 - camera.speed;
            } else {
                this.x1 -= camera.speed;
            }
            if(this.x2 < -this.cwidth){
                this.x2 += this.cwidth * 2 - camera.speed;
            } else {
                this.x2 -= camera.speed;
            }
        }
        draw() {
            for(let i = 0; i < 7; i++){
                ctx.drawImage(grounds[selectedGround], this.x1 + (i * 100), this.y, this.width, this.height);
            }
            for(let i = 0; i < 7; i++){
                ctx.drawImage(grounds[selectedGround], this.x2 + (i * 100), this.y, this.width, this.height);
            }
        }
    }

    const mygame = new Game(canvas.width, canvas.height);
    const mymenu = new Menu(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    let myhighscore;
    const mysettings = new Settings(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);

    function setHighscore(data) {
        myhighscore = new Highscore(data, canvas.width, canvas.height);
    }

    function ajax() {
        $.ajax({
            type: "POST",
            url: "savegame5.php",
            data: { data: score },
            success: function(response){
                console.log(response);
            }
        });
    }

    function ajax2() {
        $.ajax({
            url: "fetchhighscore5.php",
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

    function renderSettings() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mysettings.render();
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
                switchToSettings = true;
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
                switchToSettings = true;
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
                switchToSettings = true;
                switchToMenu = true;
                switchToGame = true;
                renderHighscore();
                break;
            case 4:
                if(switchToSettings) {
                    menuSound.play();
                    menuSound.addEventListener("ended", function() {
                        menuSound.currentTime = 0;
                        menuSound.play();
                    });
                    switchToSettings = false;
                }
                switchToHighscore = true;
                switchToMenu = true;
                switchToGame = true;
                renderSettings();
                break;
        }
        requestAnimationFrame(animate);
    }
    
    canvas.addEventListener("click", function () {
        if (state == 1) {
            mygame.jump();
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
        if (state == 4) {
            mysettings.handleClick(x, y);
        }
    });

    animate();
}