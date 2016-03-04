// using express makes setting up the server easier since it has many shortcut methods.
var express = require('express');
var  bodyParser = require('body-parser');

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
   for (var key in req.body) {
      if(req.body.hasOwnProperty(key)) {
         theNumber += req.body[key];
         }
      }
      console.log(theNumber);
      console.log(typeof theNumber);
      res.render('pages/rolled', {
         rolledNumber : theNumber
   });
});

app.get('/lazyroll',function(req,res) {
   res.render('pages/lazyroll');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000.');
});
