/**
 * @constant express    imports Express to do all the work
 * @constant chalk      imports Chalk, which lets colors be applied to text in the server's console
 */
const express = require("express");
const chalk = require("chalk");
const https = require("https");
const fs = require("fs");
const sql = require("sqlite3");
const bcrypt = require("bcrypt");
const sanitize = require("./resuables/sanitize.js");
const credentials = {
  key: fs.readFileSync("SSLCerts/key.pem"),
  cert: fs.readFileSync("SSLCerts/cert.pem"),
};
/**
 * @constant app    runs express and actually makes the server work
 * @constant PORT   defines the port to run the server on
 */
const app = express();
const PORT = 443;
const saltRounds = 10;
const db = new sql.Database("database.db");

/**
 * Allows app to look at the ./public and ./views folders, which should contain everything neede client side
 */
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());
/**
 * Sends index.html when someone connects on the default root.
 */
app.get("/", (req, res) => {
  res.send("index.html");
});

app.post("/login", (req, res) => {
  let username = sanitize.sanitize(req.body.Username);
  let password = sanitize.sanitize(req.body.Password);

  console.log(chalk.red(username) + " : " + chalk.blue(password));

  let sqlFindAccount = "SELECT * FROM accounts WHERE username = ?";
  db.all(sqlFindAccount,[username],(err,results)=>{
    if(err) console.error(err)

    if(results.length>=1){
      console.log(results)
      //found user
      //check password
      bcrypt.compare(password, results[0].password, function(err2, result) {
        if(err2) console.error(err2)
        console.log(result)
        if(result){
          //succesful login
          res.send({message:"successful-login"})
        }
        else{
          //unsuccesful login
          res.send({message:'check-username-and-password'})
        }
    });
    }
    else{
      //user not found
      res.send({message:"check-username-and-password"})
    }
  })
});

//post request for signing up
app.post("/signup", (req, res) => {
  let insertUserSQL = 'INSERT INTO accounts(username,Fname,Lname,email,password) values(?,?,?,?,?)'

  //get all user data
  let username = sanitize.sanitize(req.body.username);
  let Fname = sanitize.sanitize(req.body.Fname);
  let Lname = sanitize.sanitize(req.body.Lname);
  let password = sanitize.sanitize(req.body.password);
  let email = sanitize.sanitize(req.body.email);
  //encrypt sensative data
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        //save data
        db.run(insertUserSQL,[username,Fname,Lname,email,hash],(err)=>{
          if(err) console.error(err)
        })
    });
});
  
  res.send('sign up')
});

/**
 * Starts the server listening on PORT, and logs in the console that the server has started
 */
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () =>
  console.log(chalk.yellow("Server started on port " + chalk.green(PORT)))
);
