# Games-with-Javascript-Website
## Fruit Catch
### About Game
Use the left and right arrows to move the basket. Catch as many fruits as you can without missing 3 of them.
### Features
1. You can select theme
2. There is leaderboard where you can compete with other players
3. Cool sound effects
4. It will automatically save your selected theme if you leave the game
5. You can pause the game
### Limitations
You can’t play it in mobile
## Balloon Pop
### About Game
Click the balloons to pop them. Pop as many balloons as you can without missing 3 of them.
### Features
1. You can select theme
2. There is leaderboard where you can compete with other players
3. Cool sound effects
4. It will automatically save your selected theme if you leave the game
5. You can pause the game
### Limitations
You can’t play it in mobile
## Ship Destroyer
### About Game
Use the mouse to drag your ship. Destroy as many ships as you can without being hit by enemy ship bullets or an enemy ship.
### Features
1. You can select weapon
2. There is leaderboard where you can compete with other players
3. Cool sound effects
4. It will automatically save your selected weapon if you leave the game
5. You can pause the game
### Limitations
You can’t play it in mobile
## ColorBall Flap
### About Game
Click the mouse to flap the ball up. Make sure to hit the ball with the same color of obstacle. Miss as many obstacles as you can to gather many points.
### Features
1. You can select color of ball
2. There is leaderboard where you can compete with other players
3. Cool sound effects
4. It will automatically save your selected color of ball if you leave the game
5. You can pause the game
### Limitations
You can’t play it in mobile
## Cube Jump
### About Game
Click the mouse to jump the icon. Avoid the spikes and thorns. Get as far as you can to gather many points.
### Features
1. You can select icons, backgrounds and grounds
2. There is leaderboard where you can compete with other players
3. Cool sound effects
4. It will automatically save your selected icons, backgrounds and grounds if you leave the game
5. You can pause the game
### Limitations
You can’t play it in mobile

## Before Using the File
In order to open the file, follow the step by step instructions below:
Note: this file will not work if you dont have xampp installed on your desktop.

1. Download the zipped code in this github repository and extract it.
2. Move the file in C:\xampp\htdocs.
3. Open http://localhost/phpmyadmin. Make sure that username is root and no password otherwise it will not work.
4. In the SQL section type this query: `CREATE DATABASE gwdb;`.
5. Click on the new generated database.Then on the SQL section type this query:
`CREATE TABLE users
(
id int AUTO_INCREMENT,
username varchar(255),
email varchar(255),
pass varchar(255),
age int,
job varchar(255),
birthdate datetime,
birthplace varchar(255),
address varchar(255),
FruitCatch int,
BalloonPop int,
ShipDestroyer int,
ColorBallFlap int,
CubeJump int,
Game1Theme int,
Game2Theme int,
Game3Weapon int,
Game4Ball int,
Game5Icon int,
Game5BG int,
Game5Ground int,
PRIMARY KEY (id)
);`
7. Then it will work now. To access a page just type the name "localhost" then followed by the directory from the htdocs folder.
