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

var	exec = require('child_process').exec,
		mongoose = require('mongoose').Mongoose,
		isUid = require('./functions.js').isUid,
		db = mongoose.connect('mongodb://localhost/ga');

require('./functions.js');

var models = ['algo', 'constant', 'population', 'gene'];
var modelJs = [];

uidSetter = function(v){
	if(!v.isUid()){
		throw "Mongoose setter value must be hex 8-4-4-4-12";
	}
	return v;
}

for(var m in models){
	modelJs[m] = require('./models/'+models[m]+'.js').model;
	
	var ps = modelJs[m].properties;
	for(var p in ps){
		if(ps[p].match(/id$/)){
			if(typeof modelJs[m].setters == 'undefined'){
				modelJs[m].setters = {};
			}
			modelJs[m].setters[ps[p]] = uidSetter;
		}
	}
	
	var name = models[m].ucFirst();
	mongoose.model(name,  modelJs[m]);
	db[name] = db.model(name);
}

exports.gid = function(cb){
	exec("uuidgen", function(error, stdout, stderr){
		if(error!==null){
			throw stderr;
		}
		cb(stdout.chomp());
	});
}

exports.send = function(client, msg, cb){
	client.send(msg);
	if(typeof cb != 'undefined'){
		cb();
	}
}

exports.do = function(client, obj){
	if(typeof obj != 'object'){
		throw "GA Server do() expects object as second parameter";
	}
	if(typeof obj['action'] == 'undefined'){
		throw "GA Server do() passed object without action";
	}
	if(obj['action'].substr(0, 1) != '_'){
		throw "GA Server do() will only process actions starting with _";
	}
	var name = obj['action'];
	if(typeof exports[name] == 'undefined'){
		throw "GA Server do() can not process undefined action";
	}
	exports[name](client, obj);
}

exports.clientDo = function(client, action, obj, cb){
	if(obj==null || typeof obj == 'undefined'){
		obj = new Object();
	}
	if(typeof obj != 'object'){
		throw "GA Server clientDo() expects nothing, null or object as third parameter";
	}
	obj.action = action;
	exports.send(client, obj, cb);
}