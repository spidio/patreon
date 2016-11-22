function Spider(x, y, color)
{
	this.position = new Vector(x, y);
	// 36 : 46 [blue]
	this.direction = new Vector(0, 0);
	this.speed = 90;
	this.speed = 25;
	this.speed = 90;
	this.lifetime = 99999999;
	this.sprite = new Sprite();
	this.sprite.setImage(document.getElementById(color == "black" ? "img-spider-black" : "img-spider-blue"));
	this.sprite.setAspectRatio("auto");
	this.size = color == "black" ? 36 : 36;
	this.sprite.setSize("auto", this.size);
	this.radians = 0;
}

Spider.prototype.draw = function(ctx)
{
	this.sprite.draw(ctx, this.position, this.radians);
}

Spider.prototype.getPosition = function()
{
	return this.position;
}

Spider.prototype.setDirection = function(vector)
{
	this.direction = vector.normalized();
	this.radians = this.direction.toRadians();
	this.radians += Math.PI / 2;
}

Spider.prototype.tickLifetime = function(dt)
{
	if (this.lifetime > 0 && this.lifetime < 99999999)
	{
		this.lifetime -= dt;
	}
}

Spider.prototype.move = function(dt)
{
	var movement = this.direction.copy();
	movement.multiplyBoth(this.speed * dt);
	this.position.addVector(movement);
	this.limitPositionBounds(-500, -375, 500, 375);
}	

Spider.prototype.increaseStatsThisFunctionHasAWeirdName = function(dt)
{
	// this.speed += dt * 1.5;
	// this.size += dt * .75;
	// this.sprite.setSize("auto", this.size);
	// //game.camera.setZoom(1 - this.size / 96)
	// //game.camera.setSize(2000, 1500)
	// game.camera.setZoom(12 / this.size + 0.75) // 48 / 48 = 1, 1 - 0.2 = 0.8; 48 /96 = 0.5, 0.5 - 0.2 = 0.3
	// // game.camera.setZoom((48 - 0) / (this.size + 1));
	// // game.camera.setZoom(((2 / 4) + this.size / ((2 - (2 / 4)) / 2)) / this.size);

	// /*

	// 	0.5 => 96
	// 	1 => 48
	// 	2 => 24

	// */

	// /*

	// 	48 => 1
	// 	96 => 0.51
	// 	192 => 0.27

	// */
}

Spider.prototype.limitPositionBounds = function(x1, y1, x2, y2)
{
	if (this.position.x < x1)
		this.position.x = x1;
	else if (this.position.x > x2)
		this.position.x = x2;

	if (this.position.y < y1)
		this.position.y = y1;
	else if (this.position.y > y2)
		this.position.y = y2;
}