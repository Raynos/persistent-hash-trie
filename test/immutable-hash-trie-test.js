'use strict'

require('better-stack-traces')

var a = require('assert')
var im = require('..')
var _ = require('lodash')
var gen = require('../benchmark/gen-data')

describe('assoc/dissoc/has/get', function(){
    it('should be able to assoc/get', function(){
        var t = im.assoc(im.Trie(), 'key', 'value')

        a.equal(im.get(t, 'key'), 'value')
        a.equal(im.get(t, 'age'), undefined)
    })

    it('should be able to assoc/has', function(){
        var t = im.assoc(im.Trie(), 'key', 'value')

        a.equal(im.has(t, 'key'), true)
        a.equal(im.has(t, 'age'), false)
    })

    it('should be able to assoc/dissoc', function(){
        var t1 = im.assoc(im.Trie(), 'key', 'value')
        var t2 = im.dissoc(t1, 'key')

        a.equal(im.has(t1, 'key'), true)
        a.equal(im.get(t1, 'key'), 'value')
        a.equal(im.has(t2, 'key'), false)
    })

    it('should be able to assoc 2 values', function(){
        var t1 = im.assoc(im.Trie(), 'key', 'value')
        var t2 = im.assoc(t1, 'other-key', 'other-value')

        a.equal(im.has(t1, 'key'), true)
        a.equal(im.get(t1, 'key'), 'value')
        a.equal(im.has(t1, 'other-key'), false)

        a.equal(im.has(t2, 'key'), true)
        a.equal(im.has(t2, 'other-key'), true)
    })
})

describe('using random data', function(){
    
    var seed = Math.random()
    var data = gen(10000, seed)
    console.log('TESTING SEED ', seed)

    describe('assoc/dissoc/has/get on trie w/ 10000 items', function(){

        // create a trie of 10000 items
        var trie = im.Trie()
        trie = _.reduce(data, function(trie, val, key){ return im.assoc(trie, key, val) }, trie)

        // ensure that the keys we're testing against weren't randomly genned,
        // really would rather not have to mess with intermittently failing tests
        // when there are no bugs.
        trie = im.dissoc(trie, 'other-key')
        trie = im.dissoc(trie, 'key')

        it('should be able to assoc/get', function(){
            var t = im.assoc(trie, 'key', 'value')

            a.equal(im.get(t, 'key'), 'value')
            a.equal(im.get(t, 'other-key'), undefined)
        })

        it('should be able to assoc/has', function(){
            var t = im.assoc(trie, 'key', 'value')

            a.equal(im.has(t, 'key'), true)
            a.equal(im.has(t, 'other-key'), false)
        })

        it('should be able to assoc/dissoc', function(){
            var t1 = im.assoc(trie, 'key', 'value')
            var t2 = im.dissoc(t1, 'key')

            a.equal(im.get(t1, 'key'), 'value')
            a.equal(im.has(t1, 'key'), true)

            a.equal(im.get(t2, 'key'), undefined)
            a.equal(im.has(t2, 'key'), false)
        })

        it('should be able to assoc 2 values', function(){
            var t1 = im.assoc(trie, 'key', 'value')
            var t2 = im.assoc(t1, 'other-key', 'other-value')

            a.equal(im.has(t1, 'key'), true)
            a.equal(im.has(t1, 'other-key'), false)

            a.equal(im.has(t2, 'key'), true)
            a.equal(im.has(t2, 'other-key'), true)
        })
    })

describe('assoc/dissoc/has/get on trie w/ 10000 items from depth 4', function(){

        // create a trie of 10000 items
        var trie = im.Trie()
        trie = _.reduce(data, function(trie, val, key){ return im.assoc(trie, key, val, null, 4) }, trie)

        trie = im.dissoc(trie, 'other-key', null, 4)
        trie = im.dissoc(trie, 'key', null, 4)

        it('should be able to assoc/get', function(){
            var t = im.assoc(trie, 'key', 'value', null, 4)

            a.equal(im.get(t, 'key', null, 4), 'value')
            a.equal(im.get(t, 'other-key', null, 4), undefined)
        })

        it('should be able to assoc/has', function(){
            var t = im.assoc(trie, 'key', 'value', null, 4)

            a.equal(im.has(t, 'key', null, 4), true)
            a.equal(im.has(t, 'other-key', null, 4), false)
        })

        it('should be able to assoc/dissoc', function(){
            var t1 = im.assoc(trie, 'key', 'value', null, 4)
            var t2 = im.dissoc(t1, 'key', null, 4)

            a.equal(im.get(t1, 'key', null, 4), 'value')
            a.equal(im.has(t1, 'key', null, 4), true)

            a.equal(im.get(t2, 'key', null, 4), undefined)
            a.equal(im.has(t2, 'key', null, 4), false)
        })

        it('should be able to assoc 2 values', function(){
            var t1 = im.assoc(trie, 'key', 'value', null, 4)
            var t2 = im.assoc(t1, 'other-key', 'other-value', null, 4)

            a.equal(im.has(t1, 'key', null, 4), true)
            a.equal(im.has(t1, 'other-key', null, 4), false)

            a.equal(im.has(t2, 'key', null, 4), true)
            a.equal(im.has(t2, 'other-key', null, 4), true)
        })
    })
})
