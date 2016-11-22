import tornado.gen
import json

class Spidy:

	def __init__(self):
		pass

	def initialize(self):
		self.loop.spawn_callback(self.startGameLoop)

	def setTornadoLoop(self, loop):
		self.loop = loop

	def setGameLoopCallback(self, callback, fps):
		self.gameLoopCallback = callback
		self.fps = fps
		self.fds = 1.0 / fps  #frame duration seconds

	@tornado.gen.coroutine
	def startGameLoop(self):
		while True:
			self.gameLoopCallback()
			yield tornado.gen.sleep(self.fds)

	def connectPlayer(self, handler):
		pass

	def handleMessage(self, handler, message):
		print "got message..",message
		print "handler of message..",handler
		data = json.loads(message)
		self.handlePacket(handler, data)

	def handlePacket(self, handler, data):
		handler.write_message_all(json.dumps(data))

	def disconnectPlayer(self, handler):
		pass


def createGameServer(loop):
	game = Spidy()
	game.setTornadoLoop(loop)
	return game