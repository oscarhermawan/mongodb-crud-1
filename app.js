const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var books = require('./routes/books')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/books', books)



app.listen(3000)
