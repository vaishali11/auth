const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express();
const router = require('./router')
const mongoose = require('mongoose')

//DB Setup
mongoose.connect('mongodb://localhost:27017/auth')

//App Setup
//Middleware in express
//Mrgan is a login framework will be used for debugging
app.use(morgan('combined'))
// parsing the request that is incoming in json
app.use(bodyParser.json({type: '*/*'}))
router(app)

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)

console.log('Server Listening on: ', port);
