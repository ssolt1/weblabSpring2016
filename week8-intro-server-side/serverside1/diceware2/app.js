// using express makes setting up the server easier since it has many shortcut methods.
var express = require('express');
var  bodyParser = require('body-parser');
var redis = require("redis")
var client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});

// var request = require('request');

var app = express();

// We are using the EJS templating engine to build the pages before sending them back
// to the browser
// this is installed using the command 'npm install ejs --save'
//  using the '--save' flag adds this library to our list of dependencies in the package.json file.
app.set('view engine', 'ejs');

// set public static files
app.use(express.static('public'));

// tell the app to use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
   res.render('pages/index');
});

app.get('/roll',function(req,res) {
   res.render('pages/roll');
});

app.post('/rolled', function(req,res) {
   var theNumber = '';
   var reply = '';
   var reply1 = '';
   for (var key in req.body) {
      if(req.body.hasOwnProperty(key)) {
         theNumber += req.body[key];
         }
      }
      console.log(theNumber);
      console.log(typeof theNumber);
      client.get(theNumber, function(err, reply) {
         console.log(reply);
         reply1 = reply;
         console.log(reply1);
         res.render('pages/rolled', {
            rolledNumber : theNumber,
            reply1 : reply
      });

   });

});

app.get('/lazyroll',function(req,res) {
   res.render('pages/lazyroll');
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000.');
});
