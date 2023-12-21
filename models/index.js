'use strict'

const mongoose = require('mongoose')
const nconf = require('nconf')
const utils = require('../utils')

const relativePath = '\\src\\env\\development.json'
let filePath ;
utils.rootRequire(relativePath , (path)=>{
filePath = path
})

nconf.file('env', filePath)

const DB_URL = nconf.get('DATABASE_URL')
mongoose.connect(DB_URL + '/collaborators', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})
