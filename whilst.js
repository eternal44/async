var async = require('async')
var http = require('http')
var url = process.argv[2]
var count = 0
var requestBody

async.whilst(
  function() {
    return requestBody !== 'meerkat'
  },

  function(done) {
    var body = ''
    return http.get(url, function(res) {
      res.on('data', function(chunk) {
        body += chunk.toString()
      })
      res.on('end', function() {
        count++
        requestBody = body.trim()
        done()
      })
    }).on('error', done)
  },

  function(err, result) {
    console.log(count)
  }
)
