//Load express
var express = require('express');
var app = express();
 var path = require('path');
//Load app config file
var config = require('./config/config.js');

//Load routes definition
var router = require('./controllers/index.js');

var fs = require('fs');

//Enable body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//HTTP Method overwriter to set error response codes
var methodOverride = require('method-override');
app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.status(500).json(message(0,'ERR_SERVER_ERROR'));
});

//Set CORS handling
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//Configure logging
if(config.app.logging.enable == true){
  var morgan = require('morgan');
  var path = require('path')
  var FileStreamRotator = require('file-stream-rotator')
  if(config.app.logging.path != undefined && config.app.logging.path != ''){
    var logDirectory = path.join(config.app.logging.path)

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: path.join(logDirectory, 'access-%DATE%.log'),
      frequency: 'daily',
      verbose: false
    })
    // setup the file logger
    app.use(morgan('combined', {stream: accessLogStream}))

  }

  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
}

//Define routes
app.use(router.routes);

//Strartup the services
start = function(){

  //Load http service
  if(config.app.http.port!=undefined && config.app.http.port != ''){
    app.listen(config.app.http.port, function(){
      console.info('Public API server running on port '+config.app.http.port);
    });
  }
}

//Error handling
process.on('uncaughtException', function(err){
  if(err.code == 'EADDRINUSE')
  console.error('Public API server could not start. Port already in use');
  else
  console.error('Public API server error: ' + err);
  process.exit('SIGTERM');
})

start();
