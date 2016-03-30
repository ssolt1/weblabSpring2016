var http = require('http');
var express = require('express');
var mailer = require('express-mailer');
var bodyParser = require('body-parser');
// var nodemailer = require("nodemailer");
var app = express();
var server = http.createServer(app);
// var creds = require('./.gmail_auth.json');


// create reusable transport method (opens pool of SMTP connections)
// var smtpTransport = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: creds
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mailer.extend(app, {
  from: 'username@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'username@gmail.com',
    pass: 'password'
  }
});

app.post('/', function (req, res, next) {
  app.mailer.send('email', {
    to: 'username@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});

// app.post('/capture', function(req, res, next){
//   var data = req.body;
//   var mailOptions = {
//       from: "Steve Solt <username@gmail.com>", // sender address
//       replyTo: data.name + '<' + data.email + '>',
//       to: "username@gmail.com", // list of receivers
//       subject: "[WebForm] - " + data.name , // Subject line
//       text: JSON.stringify(data, null, 4), // plaintext body
//       html: JSON.stringify(data, null, 4) // html body
//   }
//
//   smtpTransport.sendMail(mailOptions, function(error, response){
//       if(error){
//           console.log(error);
//       }else{
//           console.log("Message sent: " + response.message);
//       }
//   });
//
//   return res.send("Thank You!");
// })

app.use(express.static('./public'));


server.listen(3333);
