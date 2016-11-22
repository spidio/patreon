function SpidSocket(server)
{
	this.url = server;
	this.ws = new WebSocket(this.url);
	this.ws.onmessage = this.onmessage.bind(this);
}

SpidSocket.prototype.sendPacket = function(data)
{
	var json = JSON.stringify(data);
	this.ws.send(json);
}

SpidSocket.prototype.onmessage = function(message)
{
	//console.log("recieved message..",message.data)
	this.onpacketrecieved(JSON.parse(message.data));
}

SpidSocket.prototype.onpacketrecieved = function(data)
{
	var d = data["d"];

	if (d !== undefined) //i.e "d" is in data
	{
		game.player.setDirection(new Vector(d.x, d.y, d.z));
	}
}