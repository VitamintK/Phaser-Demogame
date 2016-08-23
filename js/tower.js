Tower = function(game, tilex, tiley, key){
	x = tilex*50 + 25;
	y = tiley*50 + 25;
	Phaser.Sprite.call(this, game, x, y, key);	
	this.anchor.setTo(0.5, 0.5);
}
Tower.prototype = Object.create(Phaser.Sprite.prototype);
Tower.prototype.constructor = Tower;
//Tower.prototype.add = function(game, tilex, tiley){
//	(game, tilex, tiley)
//}

FoxTower = function(game, tilex, tiley){
	Tower.call(this, game, tilex, tiley, "fox");
	this.armedState = "GUNSIN";  //"GUNSOUT", "ARMING", "DISARMING"
	this.timeSinceLastShot = 0;  // //this is not technically true, but ugh I can't think of a better way to do this

	this.animationArm = this.animations.add('arm');
	this.animationArm.onComplete.add(function(){this.armedState="GUNSOUT";this.fire();}, this);
}
FoxTower.prototype = Object.create(Tower.prototype);
FoxTower.prototype.constructor = FoxTower;
FoxTower.prototype.armUrself = function(){
	//animation;
	this.armedState = "ARMING";
	this.animationArm.play(10, false);
}
FoxTower.prototype.disarmUrself = function(){
	this.armedState = "DISARMING";
	this.animationArm.play(10, false); //should be reversed obviously
}
FoxTower.prototype.findTarget = function(){
	for(i = 0; i < wave1.children.length; i++){
		enemy = wave1.children[i];
		if(Phaser.Math.distance(enemy.x, enemy.y, this.x, this.y) < 150){//100
			this.target = wave1.children[i];
			return this.target;
		}
	}
}
FoxTower.prototype.update = function(){
	this.target = this.findTarget();
	this.timeSinceLastShot++;
	//rotate towards that target
	if(this.target == null){ //or whatever the idiomatic way to do this in js is.
		if(this.timeSinceLastShot > 40){
			this.disarmUrself();
		}
	} else {
		if(this.armedState == "GUNSIN"){
			this.armUrself();
		} else if(this.armedState == "GUNSOUT" && this.timeSinceLastShot>20){
			this.fire();
		}
	}
}
FoxTower.prototype.fire = function(){
	//shoot at where the enemy will be
	
	if(this.target == null){ 
		//THERE SHOULD BE SOMETHING HERE.  most common way this line is reached is when 
		//fox arms himself and then after the arming animation, there is no longer a target.
		this.timeSInceLastShot = 0; //? i guess
	} else {
		this.timeSinceLastShot = 0;
				game.add.existing(new FoxLaser(game, this.x, this.y, this.target.x, this.target.y, this.target));
	}
	//console.log("bam!");
}

StraightProjectile = function(game, x0, y0, xf, yf, velocity, target, key){
	//this.vx = vx; //x velocity
	//this.vy = vy; 
	//this.xf = xf; //final x position
	//this.yf = yf;
	distance = Math.sqrt((xf-x0)*(xf-x0) + (yf - y0)*(yf-y0));
	Phaser.Sprite.call(this, game, x0, y0, key);
	this.anchor.setTo(0.5, 0);
	this.rotation = Phaser.Math.angleBetween(x0, y0, xf, yf) + 3.14/2;
	this.target = target;
	tween = game.add.tween(this).to({ x: xf, y: yf}, distance*velocity, "Linear");
	tween.onComplete.add(this.hit, this);
	tween.start();
}
StraightProjectile.prototype = Object.create(Phaser.Sprite.prototype);
StraightProjectile.prototype.constructor = StraightProjectile;
StraightProjectile.prototype.hit = function(){
	this.target.damage(20);
	// console.log(this.target.exists);
	// console.log(this.target.health);
	// console.log(this.target.visible);
	this.destroy();
}
FoxLaser = function(game, x0, y0, xf, yf, target){
	StraightProjectile.call(this, game, x0, y0, xf, yf, 2, target, "foxlaser");
}
FoxLaser.prototype = Object.create(StraightProjectile.prototype);
FoxLaser.prototype.constructor = FoxLaser;

//each tower has 3 options ( i saw this in a TD I played before):
//target options: "farthest along the path", "least farthest along the path", "lowest health", "highest health", etc.
//^maybe not?  adds extra difficulty.  Depends on where you want this game to be on the casual----depth tradeoff spectrum
//^nah fuck that.  fuck casuals.  we goin all in boysss
//althoug
//one of the fox upgrades is like upsmash and it's like a culling blade, melee range.