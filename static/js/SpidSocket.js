function SpidSocket(server)
{
	this.url = server;
	this.ws = new WebSocket(this.url);
}