Enemy = function(game, x, y, key, frame, waypoints, velocity_inverse, hp){
	Phaser.Sprite.call(this, game, x, y, key);	
	this.velocity_inverse = velocity_inverse;
	this.waypoints = waypoints;
	this.health = hp;
		this.scale.setTo(0.5);

	this.anchor.setTo(0.5, 0.5);
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.spawn = function(){
	this.exists = true;
	this.alive = true;
	this.tween.start();
}
Enemy.prototype.kill = function(){
	game.cash+=2;
	this.destroy();
}

BlandEnemy = function(game){
}

Wave = function(game, EnemyClass, amount, delay, interval, waypoints, velocity_inverse, hp){
//	Phaser.Group.call(this, game);
	//this.anchor.setTo(0.5, 0.5);
	this.EnemyClass = EnemyClass;
	this.amount = amount;
	this.delay = delay;
	this.interval = interval;
	this.waypoints = waypoints;
	this.velocity_inverse = velocity_inverse;
	this.hp = hp;
	//for(var i = 0; i < amount; i++){
		
	//}
	
}
//Wave.prototype = Object.create(Phaser.Group.prototype);
Wave.prototype.constructor = Wave;
Wave.prototype.start = function(){
	if(this.delay){
		game.time.events.add(this.delay, this.start_spawning, this);
	} else {
		this.start_spawning();
	}
}
Wave.prototype.start_spawning = function(){
	//this.spawned = 1;
	//game.time.events.repeat(this.interval, this.amount, function(){this.children[this.amount - this.spawned].spawn();this.spawned++;}, this);
	game.time.events.repeat(this.interval, this.amount, this.spawnOne, this);
}
Wave.prototype.spawnOne = function(){
 	//this.getFirstDead().spawn();
 	enemy = new this.EnemyClass(game, 0, 0, 'dude', 0, this.waypoints, this.velocity_inverse, this.hp);
			//0, 0, 'dude', 0, false, waypoints, velocity_inverse, hp);
	//enemy.exists = false;
	//enemy.visible = false;
	//enemy.alive = false;

	game.enemies.add(enemy);

	enemy.anchor.setTo(0.5, 0.5);

	enemy.x = this.waypoints[0][0];
	enemy.y = this.waypoints[0][1];
	enemy.rotation = Phaser.Math.angleBetween(this.waypoints[0][0], this.waypoints[0][1], this.waypoints[1][0], this.waypoints[1][1]);

	tween = game.add.tween(enemy);
	//console.assert(waypoints.length > 1);
	//var SpeedGamingConstant = 10//30 //Kappa
	enemy.tween = tween;
	for(var wp = 1; wp < this.waypoints.length; wp++){
		distance = Math.sqrt((this.waypoints[wp][0] - this.waypoints[wp-1][0]) * (this.waypoints[wp][0] - this.waypoints[wp-1][0]) + (this.waypoints[wp][1] - this.waypoints[wp-1][1]) * (this.waypoints[wp][1] - this.waypoints[wp-1][1]));
		tween.to({ x: this.waypoints[wp][0], y: this.waypoints[wp][1] }, distance*this.velocity_inverse, "Linear");
		if(wp != this.waypoints.length -1){
			rotation = Phaser.Math.angleBetween(this.waypoints[wp][0], this.waypoints[wp][1], this.waypoints[wp+1][0], this.waypoints[wp+1][1]);
			prevrot = ((wp == 0) ? enemy.rotation : Phaser.Math.angleBetween(this.waypoints[wp-1][0], this.waypoints[wp-1][1], this.waypoints[wp][0], this.waypoints[wp][1])); //if performance is ever an issue, then find out where this is stored, or store it.  i'm lazy so this is fine.  even though writing this comment probably took longer than it would have to just cache it.  but whetutevr.
			ntween = game.add.tween(enemy).to({angle: getShortestAngle(prevrot, rotation)}, 150, "Linear");
			tween.chain(ntween);
			tween = ntween;
			ntween = game.add.tween(enemy)
			tween.chain(ntween);
			tween = ntween;
		} else {
			tween.onComplete.add(function(thing, tweenref){console.log("dead");thing.kill();});
		}
	}
	enemy.spawn();
 }
Wave.prototype.create = function (x, y, key, frame, exists, waypoints, velocity_inverse, hp) {
	var args = [];

    if (arguments.length > 5)
    {
        for (var i = 5; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
	}

    if (exists === undefined) { exists = true; }

    var child = new this.EnemyClass(this.game, x, y, key, frame, waypoints, velocity_inverse, hp);

    child.exists = exists;
    child.visible = exists;
    child.alive = exists;

    this.addChild(child);

    child.z = this.children.length;

    if (this.enableBody)
    {
        this.game.physics.enable(child, this.physicsBodyType, this.enableBodyDebug);
    }

    if (child.events)
    {
        child.events.onAddedToGroup$dispatch(child, this);
    }

    if (this.cursor === null)
    {
        this.cursor = child;
    }

    return child;

};

WaveManager = function(game, waves){
}
WaveManager.prototype.constructor = WaveManager;
WaveManager.prototype.getNextWave = function(){

}

DemoWaveManager = function(game){}