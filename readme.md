Socket.io Tests
========================

### Introduction

Simple server only package to demonstrate testing socket.io in node.
Uses Socket.io-client to connect sockets from a test suite.

### Languages/Platforms/Tools

* Node.js
* Mocha
* Socket.io

### Instructions

Clone the repository:

```
$ git clone git@github.com:snozza/sockets_example.git
```

Change into the directory and npm install the modules:

```
$ cd sockets_example
$ npm install
```

Setup:

```
Ensure that mocha is installed globally:

$ npm install mocha -g

```

Run the tests: 

```
$ mocha

```

Start the node server and visit http://localhost:3000/

```
$ node server.js
