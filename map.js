var http = require('http')
var async = require('async')

async.map(process.argv.slice(2), function(url, done){
  var body = ''
  http.get(url, function(res) {
    res.on('data', function(chunk){
      body += chunk
    })
    res.on('end', function(){
      return done(null, body)
    })
  }).on('error', function(err){
    done(err)
  })
}, function(err, results) {
  if(err) console.log(err)
  console.log(results)
})
