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

Math.randomInt = function(min, max){ //inclusive
	min = parseInt(min);
	max = parseInt(max);
	
	var range = max - min + 1;
	
	return min + Math.floor(Math.random()*range);
}

Object.prototype.className = function(){
	try {
		return this.constructor.toString().match(/function(?:\s+)(.+?)\(/)[1];
	}
	catch(e){
		return null;
	}
}

Object.prototype.isClass = function(class){
	try {
		return this.className()==class;
	}
	catch(e){
		return false;
	}	
}

is = function(obj, class){
	return typeof obj == 'object' && obj.isClass(class);
}