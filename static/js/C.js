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

function C(cons){
	if(C.instance){
		return C.instance;	
	}
	
	var _cons, _cMax, _currState, _states, _max;
	
	if(typeof cons == 'undefined'){
		_cons = new Array(
			0,
			1,
			null,
			Math.E,
			Math.LN2,
			Math.LN10,
			Math.LOG2E,
			Math.LOG10E,
			Math.PI,
			Math.SQRT1_2,
			Math.SQRT2
		);
	}
	else {
		_cons = cons;	
	}
	
	_cMax = _max = _cons.length;
	
	_currState = 0;
	
	_states = new Array();
	
	function _addState(s){
		_states.push(s);
		_max = Math.max(_max, _cMax+s.length);
	}
	
	C.addState = _addState;
	
	//iterate through the states and return true if there is a new one
	//if not then rewind and return false
	function _nextState(){
		_currState++;
		if(_currState>=_states.length){
			_currState = 0;
			return false;	
		}
		return true;
	}
	
	C.nextState = _nextState;
	
	function _get(id){
		if(id<_cMax){
			return _cons[id];	
		}
		else {
			if(typeof _states[_currState] == 'undefined'){
				return null;	
			}
			var offset = id-_cMax;
			var val = _states[_currState][offset];
			return typeof val == 'undefined' ? null : val;	
		}
	}
	
	C.get = _get;
	
	function _getMax(){
		return _max;	
	}
	
	C.max = _getMax;
	
	C.instance = this;
}

new C();