function Spider(x, y, color)
{
	this.position = new Vector(x, y);
	// 36 : 46 [blue]
	this.direction = new Vector(0, 0);
	this.speed = 90;
	this.speed = 25;
	this.lifetime = 99999999;
	this.sprite = new Sprite();
	this.sprite.setImage(document.getElementById(color == "black" ? "img-spider-black" : "img-spider-blue"));
	this.sprite.setAspectRatio("auto");
	this.size = color == "black" ? 36 : 12;
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
	this.speed += dt * 2;
	this.size += dt;
	this.sprite.setSize("auto", this.size);
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