var express = require('express');
var bodyParser = require('body-parser');
var app = express();
global.reasons = [
   { reason: 'My mom loves me'}
];

//
app.set('view engine', 'ejs');

// set public static files
app.use(express.static('public'));
//
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// // return an index.html file when the default route is requested.
// app.get('/', function (req,res) {
//    // res.send('hello world!');
//    res.sendfile('index.html');
// });

// use res.render to load an ejs view file

// index page
app.get('/', function(req,res) {
   var friends = [
      { name: 'Chanandler Bong'},
      { name: 'Rachel Green'},
      { name: 'Ross Geller'},
      { name: 'Joey Tribbiani'},
      { name: 'Monica Geller'},
      { name: 'Phoebe Buffay'}
   ];

   var tagline = "Of course there, they just call it food.";

   res.render('pages/index', {
      friends: friends,
      tagline: tagline
   });
});

// // add another route
// app.get('/about', function (req,res) {
// // app.get('/about*', function (req,res) {
//    res.sendfile('about.html');
// });

//
app.get('/about', function(req,res) {
   res.render('pages/about', {
      reasons: global.reasons
   });
});

// accept input from the about form
app.post('/about', function(req,res) {
   console.log(req.body.myReason);
   var theReason = {
      reason: req.body.myReason
   }
   global.reasons.push(theReason);
   console.log(global.reasons);
   res.render('pages/about', {
      reasons: global.reasons
   });
});

// input form
app.get('/contact', function(req,res) {
   res.sendfile('/pages/contact.html');
});

// form submission
app.post('/contact', function(req,res) {

});

app.listen(3000, function() {
   console.log('Example app listening on port 3000');
});
