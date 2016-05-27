var async = require('async')
var http = require('http')
var hostname = process.argv[2]
var port = process.argv[3]
var url = 'http://' + hostname + ':' + port

function createUser(id, done) {
  var newUser = {user_id: id + 1}

  var options = {
    hostname: hostname,
    port: port,
    path: url + '/users/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  var req = http.request(options, function(res) {
    var body = ''
    res.setEncoding('utf8')
    res.on('data', function(chunk){
      body += chunk.toString()
    })
    res.on('end', function(){
      done(null, body)
    })
  })

  req.on('error', function(err) {
    console.error(`Problem with request: ${err.message}`)
    done()
  })

  req.write(JSON.stringify(newUser))
  req.end()
}

async.series({
  post: function(done) {
    async.times(5, function(count, done) {
      createUser(count, function(err, user) {
        if(err) return console.log('POST error:', err)
        done(err, user)
      })
    }, function(err, users){
      done(null, users)
    })
  },

  get: function(done) {
    var body = ''
    http.get(url + '/users', function(res) {
      res.on('data', function(chunk) {
        body += chunk.toString()
      })
      res.on('end', function() {
        done(null, body)
      })
    }).on('err', done)
  }
}, function(err, results) {
  if(err) return console.log('GET error:', err)
    console.log(results.get)
})
