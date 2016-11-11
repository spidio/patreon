function Game()
{
	this.canvas;
	this.ctx;
	this.offsetX = 60;
	this.offsetY = 70;
	this.fps, this.fpsInterval, this.now, this.then, this.elapsed;
	this.player;
	this.spiders = [];
}

Game.prototype.init = function()
{
	this.initCanvas();
	this.initSpiders();
	this.initEvents();
	this.initMainloop(60);
}

Game.prototype.initSpiders = function()
{
	this.player = new Spider(100, 100, "lightblue");
	this.initFakeSpider();
	//setInterval(this.clearSpiders.bind(this), 20000);
}

Game.prototype.initFakeSpider = function()
{
	var spider = new Spider(0, 0, "black");
	//spider.lifetime = (Math.random() * 10) + 5;
	//spider.lifetime = (Math.random() * 10) + 10;
	spider.position = new Vector(Math.random() * 4000 - 2000, Math.random() * 3000 - 1500)
	this.spiders.push(spider);
	setTimeout(this.initFakeSpider.bind(this), (Math.random() * 5 + 5) * 10);
	if (this.spiders.length > /*240*/100)
	{
		this.removeOneHundredSpiders();
	}
	//setTimeout(this.initFakeSpider.bind(this), (Math.random() * 4 + 4) * 2);
}

Game.prototype.removeOneHundredSpiders = function()
{
	for (var i = 0; i < /*100*/50; i++)
	{
		this.spiders.shift();
	}
}

Game.prototype.clearSpiders = function()
{
	this.spiders = [];
}

Game.prototype.initCanvas = function()
{
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	//this.initCanvasSize(800);
	this.changeCanvasSize(window.innerWidth, window.innerHeight);
}

Game.prototype.changeCanvasSize = function(width, height)
{
	//var height = width / 16 * 9;
	//this.canvas.width = width;
	//this.canvas.height = height;
	this.canvas.width = width;
	this.canvas.height = height;
	this.realWidth = width / 800;
	this.realHeight = height / 450;
}

Game.prototype.initEvents = function()
{
	canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
}

Game.prototype.initMainloop = function(fps)
{
	this.fps = fps;
	this.fpsInterval = 1000 / fps;
	this.then = Date.now();

    requestAnimationFrame(this.loop.bind(this));
}

Game.prototype.handleMouseMove = function(event)
{
	var mx = event.clientX;
	var my = event.clientY;

	mx = Math.round(mx * (this.canvas.width / this.canvas.offsetWidth));
	my = Math.round(my * (this.canvas.height / this.canvas.offsetHeight));

	this.player.setDirection(new Vector(mx - 400, my - 225));
}

Game.prototype.loop = function()
{
    requestAnimationFrame(this.loop.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed >= this.fpsInterval)
    {
    	var dt = this.elapsed;
        this.then = this.now - (this.elapsed % this.fpsInterval);
        this.mainloop(dt / 1000);
    }
}

Game.prototype.mainloop = function(dt)
{
	this.update(dt);
	this.draw(dt);
}

Game.prototype.update = function(dt)
{
	this.player.move(dt);

	this.offsetX = this.player.getX();
	this.offsetY = this.player.getY();

	var length = this.spiders.length;
	for (var i = 0; i < length; i++)
	{
		var spider = this.spiders[i];
		spider.move(dt);
		spider.tickLifetime(dt);
		if (spider.lifetime <= 0)
		{
			this.spiders.splice(i, 1);
			i--;
			length--;
		}
	}
}

Game.prototype.draw = function()
{
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.drawLines(this.player.getX() % 18, this.player.getY() % 18);
	this.player.draw(this.ctx);

	for (var i = 0; i < this.spiders.length; i++)
	{
		var spider = this.spiders[i];
		spider.draw(this.ctx);
	}
}

Game.prototype.drawLines = function(offX, offY)
{
	//console.log("OFFSET =", offset)
	for (var i = 0; i <= 25; i++)
	{
		var y = i * 18 - offY;
		this.ctx.strokeStyle = "#eee";
		this.ctx.beginPath();
		this.ctx.moveTo(0, y);
		this.ctx.lineTo(800, y);
		this.ctx.stroke();
	}
	for (var j = 0; j <= 45; j++)
	{
		var x = j * 18 - offX;
		this.ctx.strokeStyle = "#eee";
		this.ctx.beginPath();
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, 450);
		this.ctx.stroke();	
	}
}

Game.prototype.x = function(amount)
{
	return amount - this.offsetX + 400;
}

Game.prototype.y = function(amount)
{
	return amount - this.offsetY + 225;
}