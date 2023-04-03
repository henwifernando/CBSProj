const mysql = require("mysql");
exports.getForm = (req, res) => {
  res.render("form");
};

function affineEncrypt(text, a, b) {
  text = text.toUpperCase().replace(/\s+/g, '');
  let cipherText = '';

  for (let i = 0; i < text.length; i++) {

    const ascii = text.charCodeAt(i);
    const cipherAscii = (a * ascii + b) % 26 + 65;
    cipherText += String.fromCharCode(cipherAscii);
  }

  return cipherText;
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myProject",
});

exports.postForm = (req, res) => {

  const a = Math.floor(Math.random() * 25) + 1; 
  const b = Math.floor(Math.random() * 25); 

  const lastname = affineEncrypt(req.body.lastname, a, b);
  const firstname = affineEncrypt(req.body.firstname, a, b);

  const { middlename, homeaddress, country, region, city, zip, birthdate, status, gender, hobby } = req.body;

  if (typeof hobby === 'string' || hobby instanceof String) req.body.hobby = [hobby]

  const sql =
    "INSERT INTO formtable (lastname, firstname, middlename, homeaddress, country, region, city, zip, birthdate, status, gender, hobby, a, b) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [lastname, firstname, middlename, homeaddress, country, region, city, zip, birthdate, status, gender, hobby.join(), a, b];

  connection.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("entry added");
    connection.destroy();
    res.render("form");
  });
}
    