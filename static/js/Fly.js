function Fly()
{
	
}

Fly.prototype.draw = function(ctx)
{	
	var radians = this.radians; //change!

	var x = game.camera.x(this.position.x);
	var y = game.camera.y(this.position.y);
	ctx.translate(x, y);
	ctx.rotate(radians);
	ctx.drawImage(this.image, this.center - 8, this.center, this.size + 16, this.size);
	ctx.rotate(-radians);
	ctx.translate(-x, -y);
}