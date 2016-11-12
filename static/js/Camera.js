function Camera()
{
	this.position = null;
}

Camera.prototype.setPosition = function(vector)
{
	this.position = vector;
}

Camera.prototype.setSize = function(w, h)
{
	this.centerX = w / 2;
	this.centerY = h / 2;
}

Camera.prototype.x = function(x)
{
	return x - this.position.x + this.centerX;
}

Camera.prototype.y = function(y)
{
	return y - this.position.y + this.centerY;
}

Camera.prototype.xy = function(x, y)
{
	return new Vector(this.position.x - x, this.position.y - y);
}