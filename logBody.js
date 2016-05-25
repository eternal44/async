var fs = require('fs')
var http = require('http')
var async = require('async')
var filePath = process.argv[2]

async.waterfall([
  function(done) {
    fs.readFile(filePath, function(err, data) {
      if(err) return done(err)
      done(null, data.toString())
    })
  },

  function(data, done) {
    var body = ''
    http.get(data.trim(), function(res) {
      res.on('data', function(chunk) {
        body += chunk.toString()
      })
      res.on('end', function() {
        done(null, body)
      })
    }).on('error', function(err) {
      done(err)
    })
  }
], function done(err, result){
  if (err) return console.error(err);
  console.log(result)
})
