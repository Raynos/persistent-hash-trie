'use strict'

var suite = new require('benchmark').Suite('dissoc property from Trie of 1')

var test = function(name, im){ 
	var trie = im.assoc(im.Trie(), 'key', 'val')

	suite.add(name, function(){
		im.dissoc(trie, 'key')
	})
}

test('current', require('..'))
test('v0.2.1', require('./previous-versions/0.2.1/'))

module.exports = suite