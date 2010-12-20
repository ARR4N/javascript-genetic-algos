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

function Chromosome(type, data){
	var _type, _data, _len;
	var _lenLimit = 1000;
	
	if(is(type, 'Array') && is(data, 'Array') && type.length==data.length){
		_type = type;
		_data = data;
		_len = type.length
	}
	else {
		_type = new Array();
		_data = new Array();
	}
	
	function _addBase(){
		if(_len<_lenLimit && Math.random()<_funcProb){
			_type.push(1);
			_data.push(Math.randomInt(0, F.max()));
			_addBase(); //left
			_addBase(); //right
		}
		else {
			_type.push(0);
			_data.push(Math.randomInt(0, C.max()));
		}
		_len++;
	}
}