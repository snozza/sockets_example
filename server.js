var server = require('http').createServer(handler)
var io = require('socket.io').listen(server);

function handler(req, res) {

  if (req.method === 'GET') {
    if (req.url === '/') {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('Hello, Socket World!');
    res.end();
    } else {
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('Oops! Diddy not found');
    }
  }
}

io.on('connection', function(socket) {
  console.log('New client connected: ' + socket.id);

  socket.on('hello', function(data) {
    socket.emit('hello', 'Fine thanks. ' + data)
  });

  socket.on('main-room', function() {
    socket.join('mainRoom', function() {
      // console.log(io.nsps['/'].adapter.rooms['mainRoom']);
      socket.emit('join-room', 'mainRoom');
    });
  });

  socket.on('leave-room', function(data) {
    socket.leave(data);
    socket.emit('leave-room', data);
  });

  socket.on('delete-post', function(_id) {
    io.sockets.emit('delete-post', _id);
  });

  socket.on('disconnect', function() {
  });
});


if(!module.parent) {
  server.listen(3000, function() {
    console.log('Server listening on 3000');
  });
}

module.exports = server;