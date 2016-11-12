function CanvasPixels()
{
	
}

CanvasPixels.prototype.setCanvasSize = function(w, h)
{
	this.cw = w;
	this.ch = h;
}

CanvasPixels.prototype.setVirtualSize = function(size)
{
	this.vs = size;
}

CanvasPixels.prototype.from = function(vp)
{
	return vp / this.vs * this.cw;
}

CanvasPixels.prototype.tovp = function(cp)
{
	return cp / this.cw * this.vs;
}