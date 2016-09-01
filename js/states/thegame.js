var theGame = function(game){

}

theGame.prototype = {
        preload: function(){

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
            game.load.image('tower_select', 'assets/tower_select.png');

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            game.load.spritesheet('fox', 'assets/dude.png', 32, 48);
            game.load.image('foxlaser', 'assets/star.png');
            //game.load.spritesheet('foxlaser', 'assets/rectangle.png', 10, 60);
            game.load.tilemap('desert', 'assets/tilemaps/maps/desert.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
    	game.load.spritesheet('button', 'assets/firstaid.png', 32, 48)
    },

    create: function() {
    	game.stage.disableVisibilityChange = true;

        map = game.add.tilemap('desert');
                map.addTilesetImage('Desert', 'tiles');
                layer = map.createLayer('Ground');
                //layer.resize(500, 500);
                //layer.resizeWorld();
        layer.scale.setTo(TILESIZE/NATIVETILESIZE);

    	button = game.add.button(game.world.centerX - 20 , 70 + 50, 'button', start, this, 2, 1, 0);
    	//t_select = game.add.button(game.world.centerX-200, 550, 'tower_select', function(){}, this); CHAR SELECT
    	//t_select.scale.setTo(0.2,0.2)
    	
    	//F = new FoxTower(game, 4, 4);
        //game.add.existing(F);

        game.scenery_forbidden = make_tilemap_from_waypoints(wp, map);
        game.towers_forbidden = [];

        createTileSelector();
        game.input.addMoveCallback(updateMarker, this);
        //waves = 
        //game.state.add("dead", dead);
        	game.has_began = false;
        	game.cash = 44;
        	game.lives = 5;
        	game.waves_spawned = 0;
        	game.enemies = game.add.group();
      	//start();
    },

    update: function(){
        // game.physics.arcade.collide(player, platforms);

        // player.body.velocity.x = 0;
        // if(cursors.left.isDown){
        //  player.body.velocity.x = -150;
        //  player.animations.play('left');
        // } else if(cursors.right.isDown){
        //  player.body.velocity.x = 150;
        //  player.animations.play('right');
        // } else {
        //  player.animations.stop();
        //  player.frame = 4;
        // }
        // if(cursors.up.isDown && player.body.touching.down){
        //  player.body.velocity.y = -350;
        // }
        // game.physics.arcade.collide(stars, platforms);
        // game.physics.arcade.overlap(player, stars, collectStar, null, this);
    },

    render: function() {
        // Sprite debug info
        //game.debug.spriteInfo(star, 32, 32);
        game.debug.text('$' + game.cash, 50, 50);
        game.debug.text(game.lives + ' ' + (game.lives==1?'life':'lives'), 50, 70);
        game.debug.text('press first aid to spawn new wave.', 400, 50);
        game.debug.text(' try to get to $400', 420, 100)
        game.debug.text((Math.floor(this.game.time.elapsedSince(this.game.time_start)/100)/10) + ' sec', 50, 90);
        game.debug.text(game.waves_spawned + " waves spawned", 50, 110)
    }
}