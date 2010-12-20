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

function DNA(dna){
	
	var _dna;
	var _lenLimit = 1000;
	var _len = 0;
	var _funcProb = 0.6;
	var _nodeLengths = new Array();
	var _nodeValues = new Array();

	try {
		if(is(dna, 'Array') && is(dna[0], 'Array') && is(dna[1], 'Array') && dna[0].length==dna[1].length){
			_dna = dna;
			_len = dna[0].length;
		}
		else {
			throw 0;
		}
	}
	catch(e){
		_random();
	}
	
	function _addBase(){
		if(_len<_lenLimit && Math.random()<_funcProb){
			_dna[0].push(1);
			_dna[1].push(Math.randomInt(0, F.max()-1));
			_addBase(); //left
			_addBase(); //right
		}
		else {
			_dna[0].push(0);
			_dna[1].push(Math.randomInt(0, C.max()-1));
		}
		_len++;
	}
	
	function _random(){
		_dna = new Array(new Array(), new Array());
		_len = 0;
		_addBase();
	}
	
	this.nodeLengthAt = _nodeLengthAt;
	
	function _nodeLengthAt(i){
		i = parseInt(i);
		
		if(typeof _nodeLengths[i] != 'undefined'){
			return _nodeLengths[i];
		}
		
		if(i>=_len){
			throw "Can not get node outside length of DNA";
		}
		
		var open = 1; //consider the node here to be open until closed by a function (adding 2 more open nodes -> +2-1) or a constant (adding no more open nodes +0-1)
		var nodeLen = 0;
		
		while(open>0){
			if(_dna[0][i+nodeLen]==1){
				open++;
			}
			else {
				open--;
			}
			nodeLen++;
		}
		
		_nodeLengths[i] = nodeLen;
		return nodeLen;
	}
	
	this.nodeAt = _nodeAt;
	
	function _nodeAt(i){
		var node = new Array(new Array(), new Array());
		var nodeLen = _nodeLengthAt(i);
		for(var j=0; j<nodeLen; j++){
			node[0].push(_dna[0][i+j]);
			node[1].push(_dna[1][i+j]);
		}
		return node;
	}
	
	this.randomNode = _randomNode;
	
	function _randomNode(){
		return _nodeAt(Math.randomInt(0, _len-1));
	}
	
	this.replaceNodeAt = _replaceNodeAt;
	
	function _replaceNodeAt(i, node){
		var len = _nodeLengthAt(i);
		
		var type = _dna[0].join('');
		var data = _dna[1].join('');
		
		var newType = node[0].join('');
		var newData = node[1].join('');
		
		_dna[0] = type.substr(0, i) + newType + type.substr(i+len);
		_dna[1] = data.substr(0, i) + newData + data.substr(i+len);
		
		_dna[0] = _dna[0].split('');
		_dna[1] = _dna[1].split('');
		
		_len = _dna[0].length;
		_nodeLengths = new Array();
	}
	
	this.replaceRandomNode = _replaceRandomNode;
	
	function _replaceRandomNode(node){
		_replaceNodeAt(Math.randomInt(0, _len-1), node);
	}
	
	this.express = function(){
		return _expressNodeAt(0);
	}
	
	this.expressNodeAt = _expressNodeAt;
	
	function _expressNodeAt(i){
		i = parseInt(i);
		
		if(typeof _nodeValues[i] != 'undefined'){
			return _nodeValues[i];
		}
		
		var data = _dna[1][i];
		switch(_dna[0][i]){
			case 0: //constant
				return _nodeValues[i] = C.get(data);
			case 1: //function
				var left = i+1;
				var right = left + _nodeLengthAt(left);
				return _nodeValues[i] = F.run(data, _expressNodeAt(left), _expressNodeAt(right));
		}
	}
}