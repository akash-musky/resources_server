'use strict'

const express = require('express')
const nconf = require('nconf')
const app = express()
const utils = require('./utils')
const { User } = require('./models/user')
const bodyParser = require('body-parser')

//Use body-parser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Load environment variables into nconf
const relativePath = '\\src\\env\\development.json'
let filePath
utils.rootRequire(relativePath, (path) => {
    filePath = path
})

nconf.file('env', filePath)
const port = process.env.PORT || nconf.get('PORT')

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!')
})

app.get('/users', async (req, res) => {
    const { username, email, password } = req.query
    const newUser = new User({
        username,
        email,
        password
    })

    try {
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.send('User saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
