var http = require('http')
var async = require('async')
var hostName = process.argv[2]
var port = process.argv[3]
var url = 'http://' + hostName + ':' + port

function createUser(id, done) {
  var opts = {
    hostname: hostName,
    port: port,
    path: '/users/create',
    method: 'POST'
  }

  var newUser = {
    user_id: id + 1
  }
  newUser = JSON.stringify(newUser)

  var body = '';
  var req = http.request(opts, function(res) {
    res.on('data', function(chunk) {
      body += chunk.toString()
    })
    res.on('end', function() {
      done()
    })
  })

  req.on('error', function(err){
    done(err)
  })

  req.write(newUser)
  req.end()
}

async.series({  
  post: function(done) {
    async.times(5, function(count, done){
      createUser(count, function(err, user) {
        done(err, user)
      })
    }, function(err, users) {
      if(err) return done(err)
      done(null, 'saved')
      // we should have 5 users here
    })
  },
  get: function(done) {
    http.get(url + '/users', function(res) {
      var body = ''
      res.on('data', function(chunk){
        body += chunk.toString()
      })
      res.on('end', function() {
        done(null, body)
      })
    }).on('error', done)
  }
}, function(err, results) {
  if(err) return console.log(err)
  console.log(results.get)
})



