const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const db = require('./database');
 
const app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Serving Static Files
app.use(express.static(path.join(__dirname, 'public')));

 
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
 
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

app.get('/contact-us', function(req, res, next) {
  res.render('contact-us', { title: 'Contact-Us' });
});
 
app.post('/contact-us', function(req, res, next) {
  const company_name = req.body.company_name;
  const altcompany_name = req.body.altcompany_name;
  const companyWebsite = req.body.companyWebsite;
  const inc_date = req.body.inc_date;
  const company_mission = req.body.company_mission;
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const email = req.body.email;
  const message = req.body.message;
 
  const sql = `INSERT INTO nvidiainceptionreg (company_name, altcompany_name, companyWebsite, inc_date, company_mission, f_name, l_name, email, message, created_at ) VALUES ("${company_name}", "${altcompany_name}", "${companyWebsite}", "${inc_date}", "${company_mission}", "${f_name}", "${l_name}", "${email}", "${message}", NOW())`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
    res.redirect('/');
  });
});
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;