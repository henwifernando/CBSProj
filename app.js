const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

const session = require('express-session');

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));


//define the routes
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const formController = require('./routes/form')

app.use("/", loginRoutes);
app.use("/",registerRoutes);
app.use("/", formController);



 //logut
 app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.render('login', { errorMessage: null, successMessage:'You have logged out.'});
      }
    });
  });


  // start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  