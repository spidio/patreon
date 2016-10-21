function Vector(x, y)
{
	this.x = x;
	this.y = y;
}

Vector.prototype.magnitude = function()
{
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.normalize = function()
{
	var normalized = this.normalized();
	this.x = normalized.getX();
	this.y = normalized.getY();
}

Vector.prototype.normalized = function()
{
	var magnitude = this.magnitude();
	return new Vector(this.x / magnitude, this.y / magnitude);
}

Vector.prototype.getX = function()
{
	return this.x;
}

Vector.prototype.getY = function()
{
	return this.y;
}

Vector.prototype.copy = function()
{
	return new Vector(this.x, this.y);
}

Vector.prototype.addVector = function(vector)
{
	this.x += vector.getX();
	this.y += vector.getY();
}

Vector.prototype.multiplyBoth = function(amount)
{
	this.x *= amount;
	this.y *= amount;
}

Vector.prototype.toRadians = function()
{
	return Math.atan2(this.y, this.x);
}