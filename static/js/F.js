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

function F(){
	
	if(F.instance){
		return F.instance;
	}
	
	var _fns, _max;
	
	_fns = new Array(
		function(a, b){
			return a+b;	
		},
		function(a, b){
			return a-b;
		},
		function(a, b){
			return a*b;
		},
		function(a, b){
			return a/b;
		},
		Math.pow,
		Math.max,
		Math.min,
		function(a, b){
			return (a+b)/2;
		},
		//normal distribution mean 0 sd $b or 1
		function(a, b){
			var v = typeof b != 'number' || b==0 ? 1 : b*b;
			if(v==0){ //above check sometimes wasn't working
				v = 1;
			}
			var c = 1/Math.sqrt(2*Math.PI*v);
			var e = a*a/(2*v);
			return c*Math.exp(-e);
		},
		function(a, b){
			return Math.sqrt(a);
		},
		function(a, b){
			return Math.sqrt(b);
		},
		function(a, b){
			return Math.abs(a);
		},
		function(a, b){
			return Math.abs(b);
		}
	);
	
	_max = _fns.length;
	
	function _getMax(){
		return _max;
	}
	
	F.max = _getMax;
	
	function _run(id, a, b){
		try {
			var val = _fns[id](a, b);
			if(
				isNaN(val)
			){
				throw 0;
			}
			return val;
		}
		catch(e){
			return null;
		}	
	}
	
	F.run = _run;
	
	F.instance = this;
		
};

new F();