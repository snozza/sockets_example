var server = require('../server');
var expect = require('chai').expect
var io = require('socket.io-client');

describe('Server receives and action socket emissions', function() {

  var options = {
    'transports' : ['websocket'],
    'forceNew': true //incase you want multiple sockets
  };
  var person1 = 'tansaku';
  var person2 = 'henry';

  before(function(done) {
    server.listen(3000, function() {
      done();
    })
  });

  after(function(done) {
    server.close();
    done();
  });

  it('echos the socket emission from client', function(done) {
    var socket1 = io.connect('http://localhost:3000', options);
    socket1.on('hello', function(data) {
      expect(data).to.contain('tansaku');
      socket1.disconnect();
      
      var socket2 = io.connect('http://localhost:3000', options);
      socket2.on('hello', function(data) {
        expect(data).to.contain('henry');
        socket2.disconnect();
        done();
      });
      socket2.emit('hello', person2);
    });
    socket1.emit('hello', person1);
  });

  it('should join mainRoom upon emission', function(done) {
    var socket = io.connect('http://localhost:3000', options);
    socket.on('join-room', function(data) {
      expect(data).to.eql('mainRoom');
      socket.disconnect();
      done();
    });
    socket.emit('main-room');
  });

  it('should leave mainRoom upon emission', function(done) {
    var socket = io.connect('http://localhost:3000', options);
    socket.on('leave-room', function(data) {
      expect(data).to.eql('mainRoom');
      socket.disconnect();
      done();
    });
    socket.emit('leave-room', 'mainRoom');
  });

  it('should emit delete-post with id', function(done) {
    var socket = io.connect('http://localhost:3000', options);
    socket.on('delete-post', function(_id) {
      expect(_id).to.exist
      socket.disconnect();
      done();
    });
    socket.emit('main-room');
    socket.emit('delete-post', '12345');
  });

});