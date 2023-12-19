//Install express server
const express = require('express');
const path = require('path');

var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});


const app = express();
app.use(limiter);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/portefolio'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/portefolio/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Console listening!');