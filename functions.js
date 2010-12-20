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

String.prototype.ucFirst = function () {
    return this.substr(0,1).toUpperCase()+this.substr(1);
};

String.prototype.chomp = function () {
    return this.substr(0).replace(/(\n|\r)+$/, '');
};

String.prototype.isUid = function () {
	try{
		return this.substr(0).match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/).length>0;
	}
	catch(e){
		return false;
	}
};

Math.between = function(val, min, max){
	return Math.min(max, Math.max(min, val));
}

Math.range = Math.between;

Math.atLeastInt = function(a, b){
	return Math.max(parseInt(a), parseInt(b)); //considered having val, min as parameters but this way order doesn't matter
}