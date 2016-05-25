// official solution
var http = require('http')
var async = require('async')

async.each(process.argv.slice(2), function(url, done){
  http.get(url, function(res) {
    res.on('end', function(data){
      done(data)
    })
  }).on('error', function(err){
    done(err)
  })
}, function(err) {
  if(err) console.log(err)
})


// My solution
// var http = require('http')
// var async = require('async')
// var url1 = process.argv[2]
// var url2 = process.argv[3]

// async.each([url1, url2], function(url, done){
//   http.get(url, (function(res) {
//     res.resume()
//   })).on('error', function(err) {
//     console.log(err)
//   }), function(err) {
//     if (err) console.log(err)
//   }
// })
