var
  express        = require('express'),
  app            = express(),
  ejs            = require('ejs'),
  ejsLayouts     = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  flash          = require('morgan'),
  logger         = require('morgan'),
  cookieParser   = require('cookie-parser'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  passport       = require('passport'),
  //
  passportConfig = require('./config/passport.js'),
  //
  userRoutes     = require('./routes/users.js')

//environment port
var port = process.env.PORT || 3000

//mongoose connection
mongoose.connect('mongodb://localhost/mixer', function(err){
  if(err) return console.log('cannot connect :(')
  console.log('Connected to MongoDB. Fook Yeah!')
})

//middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//ejs congiguration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//session + passport
app.use(session({
  secret: "boomchakalaka",
  cookie:{_expires : 6000000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//root route
app.get('/', function(req,res){
  res.render('index')
})

userRoutes = require('./routes/users.js')

app.use('/', userRoutes)

app.listen(port, function(){
  console.log("Server running on port", port)
})
