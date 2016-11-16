function Camera()
{
	this.position = null;
	this.zoom = 1;
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
	return game.cp.from(x * this.zoom - this.position.x * this.zoom + this.centerX);
}

Camera.prototype.y = function(y)
{
	return game.cp.from(y * this.zoom - this.position.y * this.zoom + this.centerY);
}

/*

	0, 0; 50, 50 : 1 # 50, 50
	0, 0; 50, 50 : 2 # 100, 100

	100, 100; 0, 0 : 1 > 0 -

*/

Camera.prototype.p = function(int)
{
	return game.cp.from(int * this.zoom);
}

Camera.prototype.xy = function(vector)
{
	return new Vector(this.position.x - vector.x, this.position.y - vector.y);
}

Camera.prototype.setZoom = function(zoom)
{
	this.zoom = zoom;
}