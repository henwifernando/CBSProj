const mysql = require('mysql');

// configure the MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myProject'
 });

  // define the route for the register page
  exports.getRegister = (req, res) => {
    //res.render('register');

    res.render('register', { errorMessage: null, successMessage:null});
  };


  //Caeasr Encryption of Password
  const caesarCipher = {
    encrypt: function(text, shift) {
      let result = '';

      for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122) || (char >= 48 && char <= 57) || (char >= 32 && char <= 47) || 
      (char >= 58 && char <= 64) || (char >= 91 && char <= 96) || (char >= 123 && char <= 126)) {
        result += String.fromCharCode(((char - 32 + shift) % 94) + 32);
      } else {
        result += text.charAt(i);
      }
    }
      return result;
    }
  }



  //define the route for submitting the reg form data
  exports.postRegister = (req, res) => {
    const { name, email, password, cpassword, usertype } = req.body;

    if(!name || !email || !password) {
      return res.render('./register',{ errorMessage: 'Name, email, and password are required', successMessage:null})
    }

    //Pass policy
    if (password.length < 8) {
      //return res.json({status:"error", error:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Your password is too short', successMessage:null})
      }
    if (password.search(/[A-Z]/i) < 0) {
      //return res.json({status:'errorMessage', errorerrorMessage:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Password should include atleast 1 uppercase', successMessage:null})
      }
    if (password.search(/[a-z]/i) < 0) {
      //return res.json({status:'errorMessage', errorerrorMessage:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Password should include atleast 1 lowercase', successMessage:null})
      }
    if (password.search(/[0-9]/) < 0) {
      //return res.json({status:'errorMessage', errorerrorMessage:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Password should include atleast 1 digit', successMessage:null})
      }
    if (password.search(/[!@#\$%\^&\*_]/) < 0) {
      //return res.json({status:'errorMessage', errorerrorMessage:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Password should include atleast 1 special character', successMessage:null})
    }
    if(password.includes(' ')) {
      //return res.json({status:'errorMessage', errorerrorMessage:'Your password is too short'});
      return res.render('./register',{ errorMessage: 'Password should not include spaces', successMessage:null})

    }
      //end of pass policy
    if(password !== cpassword) {
      return res.render('./register',{ errorMessage: 'Password do not match', successMessage:null})
    } 


    //Check if it is an existing account
    //Display error message if the account already exists
    const checkAccount = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkAccount, [email], (err, results) =>{
      if(err) throw err;

      if(results.length > 0) {
        return res.render('./register',{ errorMessage: 'This account already exist', successMessage:null})
      } else{
         //Input data into database
        const encryptedPassword = caesarCipher.encrypt(password, 3); 
        const sql = `INSERT INTO users (name, email, password, usertype) VALUES ('${name}','${email}', '${encryptedPassword}', '${usertype}')`;

        connection.query(sql, [name, email, password, usertype], function(err, result) {
          if (err) throw err;
          res.render('./login', { errorMessage: null, successMessage:'Registration Successful.'});
        });

      }

    });
   
  }
