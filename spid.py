import tornado.ioloop
import tornado.web
import tornado.websocket
import spidy
import os

def SpidApp():

	settings = {
		"debug": True,
		"cookie_secret": "DFGHFCTHJUYTDRESHJUYTDRESTYUHIYTREFGTHJMYTDGHJMHVNGCF",
		"static_path": os.path.join(os.path.dirname(__file__), "static")
	}

	app = tornado.web.Application([
		(r"/", MainHandler),
		(r"/", GameHandler),
	], **settings)

	return app

class MainHandler(tornado.web.RequestHandler):

    def get(self):
    	self.render("templates/index.html")


def get_arg(self, arg, or_=None):
	try:
		value = self.get_argument(arg)
	except:
		value = or_

	return value

def get_form(self, f, or_=None):
	try:
		value = self.get_body_argument(f)
	except:
		value = or_

	return value

def write_message_all(self, message):
	[c.write_message(message) for c in self.cons]






class GameHandler(tornado.websocket.WebSocketHandler):

	cons = [];

	def open(self):
		self.cons.append(self)
		game.connectPlayer(self)

	def on_message(self, message):
		game.handleMessage(self, message)

	def on_close(self):
		self.cons.remove(self)
		game.disconnectPlayer(self)

def initializeGame():
	game = spidy.createGameServer(loop)
	game.setGameLoopCallback(gameLoop, 20)
	game.initialize()

def gameLoop():
	print("tick")






app = SpidApp()

if __name__ == "__main__":
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
else:
	loop = tornado.ioloop.IOLoop.current()
	initializeGame()