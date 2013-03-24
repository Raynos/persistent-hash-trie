'use strict'

var _ = require('lodash')

var suite = new require('benchmark').Suite('triensient from Trie of 10')

var gen = require('./gen-data')
var data = gen(10, Math.random())

var current = require('..')
var currentT = _.reduce(data, function(trie, val, key){
	return current.assoc(trie, key, val)
}, current.Trie())


suite.add('current', function(){
	current.transient(currentT)
})

module.exports = suite