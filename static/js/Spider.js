function Spider(x, y, color)
{
	this.position = new Vector(x, y);
	this.size = 26;
	this.size = 36;
	this.size = 46;
	this.center = -this.size/2;
	this.color = color;
	this.direction = new Vector(0, 0);
	this.speed = 120;
	this.speed = 180;
	this.speed = 90;
	this.speed = 90;
	this.lifetime = 99999999;
	this.image = document.getElementById("spiderImage");
	this.radians = 0;
}

Spider.prototype.draw = function(ctx)
{
	
	//radians = Math.PI / 180 * angle;
	//angle = "meh"
	//console.log("angle,radians:"+angle+","+radians)
	//ctx.fillRect(395, 220, 10, 10);
	var radians = this.radians; //change!

	var x = game.x(this.position.x);
	var y = game.y(this.position.y);
	ctx.translate(x, y);
	ctx.rotate(radians);
	ctx.drawImage(this.image, this.center - 8, this.center, this.size + 16, this.size);
	ctx.rotate(-radians);
	ctx.translate(-x, -y);
}

Spider.prototype.getX = function()
{
	return this.position.x;
}

Spider.prototype.getY = function()
{
	return this.position.y;
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
	//console.log("dt:", dt)
	//console.log("movement:", movement)
	this.position.addVector(movement);
	this.limitPositionBounds(-2000, -1500, 2000, 1500);

	//this.position.addVector(new Vector(this.speed * -dt, this.speed * -dt));
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