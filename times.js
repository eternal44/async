var http = require('http')
var async = require('async')
var url = process.argv[2]
var port = process.argv[3]

function createUser(id) {
  var opts = {
    hostname: url,
    path: '/users/create',
    method: 'POST'
  }

  var newUser = {
    user_id: id
  }
  newUser = JSON.stringify(newUser)

  var body = '';
  var req = http.request(opts, function(res) {
    res.on('data', function(chunk) {
      body += chunk.toString()
    })
    res.on('end', function() {
      return done(null, body)
    })
  })

  req.write(newUser)
  req.end()
}

async.series({  
  times: function(done) {
    async.times(5, function(count, done){
      createUser(count, function(err, user) {
        next(err, user)
      })
    }, function(err, users) {
      done(err, user)
      // we should have 5 users here
    })
  },
  get: function(done) {
    var body = ''
    http.get(url + '/users', function(res) {
      res.on('data', function(chunk){
        body += chunk.toString()
      })
      res.on('end', function() {
        done(null, body)
      })
    })
  }
}, function(err, results) {
  console.log(results)
})



