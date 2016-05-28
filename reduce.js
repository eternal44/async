var async = require('async')
var http = require('http')
var url = process.argv[2]

async.reduce(['one', 'two', 'three'], 0, function(memo, item, done) {
  var body = ''
  http.get(url + '?number=' + item, function(res) {
    res.on('data', function(chunk) {
      body += chunk.toString()
    })

    res.on('end', function(){
      done(null, memo + parseInt(body))
    })
  }).on('error', done)
}, function(err, result) {
  if(err) return console.log(err)
    console.log(result)
})
