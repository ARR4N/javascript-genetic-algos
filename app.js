/*

Copyright 2010 Arran Schlosberg (http://arranschlosberg.com);

This file is part of javascript-genetic-algos (https://github.com/aschlosberg/javascript-genetic-algos).

    javascript-genetic-algos is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    javascript-genetic-algos is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with javascript-genetic-algos.  If not, see <http://www.gnu.org/licenses/>.
    
*/

var	express = require('express'),
		io = require('socket.io'),
		app = express.createServer(
			express.staticProvider(__dirname + '/static'),
			express.bodyDecoder()
		),
		ga = require('./ga-server');

var io = io.listen(app);
  
io.on('connection', function(client){
	client.on('message', function(msg){
		ga.do(client, msg);
	});

	client.on('disconnect', function(){
	});
});

app.listen(80);
console.log('Express server started on port %s', app.address().port);