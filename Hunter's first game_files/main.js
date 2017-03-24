//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var roof;
var music;
var obstacle2;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
    game.load.image('player' , 'assets/pinapleV2.png');
    game.load.image('ground' , 'assets/wallHorizontal.png');
    game.load.image('obstacle' , 'assets/donald.png');
    game.load.image('background' , 'assets/background.png');
    game.stage.backgroundColor = '#7f00ff';
	game.load.image('roof' , 'assets/wallHorizontal.png');
  game.load.audio('backgroundMusic' , 'assets/clubstep.mp3');
  game.load.image('obstacle2' , 'assets/HungryEmoji.png')
};

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(game.width/12, game.world.height*(5/8), 'player');
    game.physics.arcade.enable(player);

    obstacle = game.add.sprite(800,game.world.height, 'obstacle'); 
    obstacle.scale.setTo(1,2);
    obstacle.anchor.setTo(0,1);
    game.physics.arcade.enable(obstacle);
    obstacle.body.immovable = true;

    platforms = game.add.group(0, 0, 'ground');
    platforms.enablebody = true;
    ground = platforms.create(0, GAME_HEIGHT, 'ground'); 
    ground.anchor.setTo(0,1);
    ground.scale.setTo(4,1);
    game.physics.arcade.enable(ground);
    ground.body.immovable = true;

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
     scoreText = game.add.text(16, 16, 'score: 0', { fontsize: '32px', fill: '#000' });

   roofforms = game.add.group(0, 0, 'roof');
   roofforms.enablebody = true;
    roof= platforms.create(0, GAME_HEIGHT*1/30, 'roof'); 
    roof.anchor.setTo(0,1);
    roof.scale.setTo(4,1);
    game.physics.arcade.enable(roof);
    roof.body.immovable = true;

    music = game.add.audio('backgroundMusic');
    music.play();

    obstacle2 = game.add.sprite(700, game.world.height/2 , 'obstacle2'); 
    obstacle2.scale.setTo(1,1);
    obstacle2.anchor.setTo(-2,2);
    game.physics.arcade.enable(obstacle2);
    obstacle2.body.immovable = true;
};

function update(){
    game.physics.arcade.collide(player, obstacle);
    game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, roof);
    game.physics.arcade.collide(player, obstacle2);


    if (spaceKey.isDown) {
        player.body.velocity.y = -300;
    }
    if (obstacle.x > 600) { 
      obstacle.x -= 0.05;
    }
    if (obstacle2.x > 600) { 
      obstacle2.x -= 0.05;
    }
    if (obstacle.x < 0) { 
       obstacle.kill();
       obstacle= game.add.sprite(900, GAME_HEIGHT, 'obstacle');
       obstacle.scale.setTo(1,2);
       obstacle.anchor.setTo(0,1);
       game.physics.arcade.enable(obstacle);
       obstacle.body.immovable = true;
    }
    
    if (obstacle2.x < -400) { 
       console.log(obstacle2.x);
       obstacle2.kill();
       obstacle2 = game.add.sprite(700, game.world.height/2 , 'obstacle2'); 
       obstacle2.scale.setTo(1,1);
       obstacle2.anchor.setTo(-2,2);
       game.physics.arcade.enable(obstacle2);
       obstacle2.body.immovable = true;
    }
    if (obstacle.x < 5 && player.x > 5){
       score++;
       scoreText.text = 'score: ' + score;
    }
    if (player.x < 0){
       scoreText = game.add.text(350,200,  'HA, DONALD TRUMP WINS!!!', {fill: '#000000'});
       obstacle.kill();
       player.kill();
    };
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();