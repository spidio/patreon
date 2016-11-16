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
	this.initEvents();
	this.initCamera();
	this.initPlayer();
	this.initMainloop(60);
}

Game.prototype.initCanvas = function()
{
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.setGameDimensions(window.innerWidth, window.innerHeight);
}

Game.prototype.initCamera = function()
{
	this.cp = new CanvasPixels();
	this.cp.setCanvasSize(this.canvas.width, this.canvas.height);
	this.cp.setVirtualSize(1280);
	this.camera = new Camera();
	this.camera.setPosition(new Vector(0, 0));
	this.camera.setSize(this.cp.tovp(this.canvas.width), this.cp.tovp(this.canvas.height));
}

Game.prototype.initEvents = function()
{
	canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
}

Game.prototype.initPlayer = function()
{
	this.player = new Spider(0, 0, "blue");
	this.addAFewSpiders(10);
}

Game.prototype.addAFewSpiders = function(amount)
{
	var moves = true;
	for (var i = 0; i < amount; i++)
	{
		var spider = new Spider(Math.random() * /*4000*/1000 - /*2000*/500, Math.random() * /*3000*/750 - /*1500*/375, "black");
		//spider.speed = 50;
		if (!moves)
			spider.speed = 0;
		else
			spider.speed = Math.random() * 90 + 45;
		moves =! moves;
		this.spiders.push(spider);
	}
}

Game.prototype.initMainloop = function(fps)
{
	this.fps = fps;
	this.fpsInterval = 1000 / fps;
	this.then = Date.now();

    requestAnimationFrame(this.tick.bind(this));
}

Game.prototype.setGameDimensions = function(width, height)
{
	this.canvas.width = width;
	this.canvas.height = height ;
}

Game.prototype.handleMouseMove = function(event)
{
	var mx = event.clientX;
	var my = event.clientY;

	mx = Math.round(mx * (this.canvas.width / this.canvas.offsetWidth));
	my = Math.round(my * (this.canvas.height / this.canvas.offsetHeight));

	this.player.setDirection(new Vector(mx - window.innerWidth / 2, my - window.innerHeight / 2));						// FIX! VERY BAD AND MESSY CODE!!
}

Game.prototype.tick = function()
{
    requestAnimationFrame(this.tick.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed >= this.fpsInterval)
    {
    	var dt = this.elapsed;
        this.then = this.now - (this.elapsed % this.fpsInterval);
        this.mainloop(dt / 1000, dt);
    }
}

Game.prototype.mainloop = function(dt, dtm)
{
	this.update(dt, dtm);
	this.draw(dt, dtm);
}

Game.prototype.update = function(dt, dtm)
{
	this.player.move(dt);
	this.player.increaseStatsThisFunctionHasAWeirdName(dt);

	this.camera.setPosition(this.player.getPosition());

	var length = this.spiders.length;
	for (var i = 0; i < length; i++)
	{
		var spider = this.spiders[i];
		if (spider.speed != 0)
			if (Math.random() < 5/100)
			{
				var vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1)
				var vec = spider.direction;
				vec.addVector(vector);
				spider.setDirection(vec);
			}
		spider.move(dt);
	}
}

Game.prototype.draw = function()
{
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	//this.drawLines(this.player.getX() % 18, this.player.getY() % 18);
	for (var i = 0; i < this.spiders.length; i++)
	{
		var spider = this.spiders[i];
		spider.draw(this.ctx);
	}

	this.player.draw(this.ctx);
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

// Game.prototype.x = function(amount)
// {
// 	var x = amount - this.offsetX + window.innerWidth / 2;
// 	x /= window.innerWidth;
// 	x *= window.innerWidth / 2;
// 	return x;
// }

// Game.prototype.y = function(amount)
// {
// 	var y = amount - this.offsetY + window.innerHeight / 2;
// 	y /= window.innerHeight;
// 	y *= window.innerHeight / 2;
// 	return y;
// }

Game.prototype.tcp = function(pixels)	// toCanvasPixels
{
	return pixels
}