function Sprite()
{
	this.image;
	this.width;
	this.height;
	this.offsetX;
	this.offsetY;
	this.aspectRatio;
	this.rotationRadians = 0;
}

Sprite.prototype.rotate = function(radians)
{
	var max = 2 * Math.PI;

	if (radians > max)
	{
		radians -= max;
	}
	
	this.rotationRadians += radians;
}

Sprite.prototype.draw = function(ctx, position, radians)
{
	position = position === undefined ? this.position : position;
	var rotation = radians === undefined ? this.rotationRadians : radians;

	var cx = game.cp.from(game.camera.x(position.x));
	var cy = game.cp.from(game.camera.y(position.y));
	var offsetX = game.cp.from(this.offsetX);
	var offsetY = game.cp.from(this.offsetY);
	var width = game.cp.from(this.width);
	var height = game.cp.from(this.height);

	ctx.translate(cx, cy);
	ctx.rotate(rotation);
	ctx.drawImage(this.image, offsetX, offsetY, width, height)
	ctx.rotate(-rotation);
	ctx.translate(-cx, -cy);
}



Sprite.prototype.setImage = function(element)
{
	this.image = element;
}

Sprite.prototype.setAspectRatio = function(a, b)
{
	if (a == "auto")
	{
		this.aspectRatio = this.image.width / this.image.height;
	}
	else
	{
		this.aspectRatio = a / b;
	}
}

Sprite.prototype.setSize = function(w, h)
{
	if (w == "auto" && h == "auto")
	{
		console.log("Failed to set size of sprite to auto, auto! What is this supposed to do?!")
		return;
	}

	if (w == "auto")
	{
		this.height = h;
		this.width = h * this.aspectRatio;
	}
	else if (h == "auto")
	{
		this.width = w;
		this.height = w / this.aspectRatio;
	}
	else
	{
		this.width = w;
		this.height = h;
	}

	this.offsetX = -this.width / 2;
	this.offsetY = -this.height / 2;
}

Sprite.prototype.setRotation = function(radians)
{
	this.rotationRadians = radians;
}

Sprite.prototype.setPosition = function(position)
{
	this.position = position;
}