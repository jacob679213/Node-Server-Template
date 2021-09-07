/**
 * @author Jacob Bitter
 * @version 1.0
*/

/**
 * @constant express    imports Express to do all the work
 * @constant chalk      imports Chalk, which lets colors be applied to text in the server's console
 */
const express = require('express')
const chalk = require('chalk')

/**
 * @constant app    runs express and actually makes the server work
 * @constant PORT   defines the port to run the server on
 */
const app = express()
const PORT = 8080

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
app.listen(PORT, ()=> console.log(chalk.yellow('Server started on port ' + chalk.green(PORT))))
