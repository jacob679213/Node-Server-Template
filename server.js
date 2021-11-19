/**
 * @constant express    imports Express to do all the work
 * @constant chalk      imports Chalk, which lets colors be applied to text in the server's console
 */
const express = require('express')
const chalk = require('chalk')
const https = require('https')
const fs = require('fs')

const credentials = {
    key: fs.readFileSync('SSLCerts/key.pem'),
    cert: fs.readFileSync('SSLCerts/cert.pem')
  };
/**
 * @constant app    runs express and actually makes the server work
 * @constant PORT   defines the port to run the server on
 */
const app = express()
const PORT = 443

/**
 * Allows app to look at the ./public and ./views folders, which should contain everything neede client side
 */
app.use(express.static('public'))
app.use(express.static('views'))

/**
 * Sends index.html when someone connects on the default root.
 */
app.get("/", (req, res) => {
    res.send('index.html')
})

/**
 * Starts the server listening on PORT, and logs in the console that the server has started
 */
 var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, ()=> console.log(chalk.yellow('Server started on port ' + chalk.green(PORT))))
