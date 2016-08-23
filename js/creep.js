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
Enemy.prototype.kill = Enemy.prototype.destroy;

BlandEnemy = function(game){
}

Wave = function(game, EnemyClass, amount, delay, interval, waypoints, velocity_inverse, hp){
	Phaser.Group.call(this, game);
	//this.anchor.setTo(0.5, 0.5);
	this.classType = EnemyClass;
	this.amount = amount;
	this.delay = delay;
	this.interval = interval;
	this.waypoints = waypoints;
	for(var i = 0; i < amount; i++){
		enemy = this.create(0, 0, 'dude', 0, false, waypoints, velocity_inverse, hp);
		enemy.anchor.setTo(0.5, 0.5);

		enemy.x = waypoints[0][0];
		enemy.y = waypoints[0][1];
		enemy.rotation = Phaser.Math.angleBetween(waypoints[0][0], waypoints[0][1], waypoints[1][0], waypoints[1][1]);

		tween = game.add.tween(enemy);
		//console.assert(waypoints.length > 1);
		//var SpeedGamingConstant = 10//30 //Kappa
		enemy.tween = tween;
		for(var wp = 1; wp < waypoints.length; wp++){
			distance = Math.sqrt((waypoints[wp][0] - waypoints[wp-1][0]) * (waypoints[wp][0] - waypoints[wp-1][0]) + (waypoints[wp][1] - waypoints[wp-1][1]) * (waypoints[wp][1] - waypoints[wp-1][1]));
			tween.to({ x: waypoints[wp][0], y: waypoints[wp][1] }, distance*velocity_inverse, "Linear");
			if(wp != waypoints.length -1){
				rotation = Phaser.Math.angleBetween(waypoints[wp][0], waypoints[wp][1], waypoints[wp+1][0], waypoints[wp+1][1]);
				prevrot = ((wp == 0) ? enemy.rotation : Phaser.Math.angleBetween(waypoints[wp-1][0], waypoints[wp-1][1], waypoints[wp][0], waypoints[wp][1])); //if performance is ever an issue, then find out where this is stored, or store it.  i'm lazy so this is fine.  even though writing this comment probably took longer than it would have to just cache it.  but whetutevr.
				ntween = game.add.tween(enemy).to({angle: getShortestAngle(prevrot, rotation)}, 150, "Linear");
				tween.chain(ntween);
				tween = ntween;
				ntween = game.add.tween(enemy)
				tween.chain(ntween);
    			tween = ntween;
    		} else {
    			tween.onComplete.add(function(thing, tweenref){thing.kill();});
    		}
    	}
	}
	if(delay){
		game.time.events.add(delay, this.start, this);
	} else {
		this.start();
	}
}
Wave.prototype = Object.create(Phaser.Group.prototype);
Wave.prototype.constructor = Wave;
Wave.prototype.start = function(){
	//this.spawned = 1;
	//game.time.events.repeat(this.interval, this.amount, function(){this.children[this.amount - this.spawned].spawn();this.spawned++;}, this);
	game.time.events.repeat(this.interval, this.amount, this.spawnOne, this);
}
Wave.prototype.spawnOne = function(){
 	this.getFirstDead().spawn();
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

    var child = new this.classType(this.game, x, y, key, frame, waypoints, velocity_inverse, hp);

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


