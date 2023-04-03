// define the route for the login page, this is also the index
exports.getLogin = (function (req, res) {
  res.render('login', { errorMessage: null, successMessage: null });
});


const mysql = require('mysql');

// configure the MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myProject',
});

//Caeasr Decryption of Password
const caesarCipher = {
  decrypt: function (text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122) || (char >= 48 && char <= 57) || (char >= 32 && char <= 47) || 
      (char >= 58 && char <= 64) || (char >= 91 && char <= 96) || (char >= 123 && char <= 126)) {
        result += String.fromCharCode(((char - 32 - shift + 94) % 94) + 32);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }
}


//define the route for logging in
exports.postLogin = (req, res) => {

  const { email, password } = req.body;

  if (email && password) {

    // Execute SQL query that'll select the account from the node_db database based on the specified email and password

    const sql = `SELECT * FROM users WHERE email=? LIMIT 1`;
    connection.query(sql, [email], function (err, result) {

      if (err) throw err;

      if (result.length > 0) {
        const origPass = result[0];
        const encryptedPassword = origPass.password
        const decryptedPassword = caesarCipher.decrypt(encryptedPassword, 3);

        if (password === decryptedPassword) {
          //if orig password matches with the decrypted pass, redirect to home
          res.render('form');
        } else {
          // If there is an issue with the query, output the error
          res.render('login', { errorMessage: 'Invalid email or password', successMessage: null });
        }
      } else {
        res.render('login', { errorMessage: 'User not found', successMessage: null });
      }
      res.end();

    });

  } else {
    //if the fields were passed empty, output the error
    res.render('login', { errorMessage: 'Please enter Email and Password! ', successMessage: null });
    res.end();
  }
};