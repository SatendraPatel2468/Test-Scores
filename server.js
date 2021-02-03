const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('./model/db')
const router = require('./controller/scoreController')
const path = require('path')
const ejs = require('ejs')
const scores = require('./model/scores')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)



app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, (req, res) => {
    console.log(`Listening to the port ${port}`)
})