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

function GA(socket){

	var _actions = {
		test : function(){
			alert('Test clientDo');
		}
	}
	
	GA.do = _do;
	function _do(obj){
		if(typeof obj != 'object'){
			throw "GA Client do() expects object";
		}
		if(typeof obj['action'] == 'undefined'){
			throw "GA Client do() passed object without action";
		}
		var name = obj['action'];
		if(typeof _actions[name] == 'undefined'){
			throw "GA Client do() can not process undefined action";
		}
		_actions[name](obj);
	}
	
	GA.send = _send;
	function _send(msg){
		socket.send(msg);
	}
	
	GA.serverDo = _serverDo;
	function _serverDo(action, obj){
		if(obj==null || typeof obj == 'undefined'){
			obj = new Object();
		}
		if(typeof obj != 'object'){
			throw "GA Server clientDo() expects nothing, null or object as third parameter";
		}
		action = action.substr(0,1)=="_" ? action : "_"+action;
		obj.action = action;
		_send(obj);
	}

}

var socket = new io.Socket();
socket.connect();

var ga = new GA(socket);

socket.on('connect', function(){
});

socket.on('message', function(data){
	try {
		GA.do(data);
	}
	catch(e){
		alert(e);
	}
});