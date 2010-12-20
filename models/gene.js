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

var isUid = require('../functions.js').isUid;

exports.model = {

    properties : ['id', 'population_id', 'dna', 'expressions'],

    cast : {
		dna : Array,
		expressions : Array
    },

    indexes : ['id', 'population_id'],

    setters : {
    	expressions : function(v){
    		if(typeof v != 'object'){
    			throw "Mongoose Gene model needs to be set with Array(constant_id, value)";
    		}
    		if(!isUid(v[0])){
    			throw "Mongoose Gene model received invalid constant_id - must be hex 8-4-4-4-12";
    		}
    		return v;
    	}
    },

    getters : {},

    methods : {},

    static : {}

}