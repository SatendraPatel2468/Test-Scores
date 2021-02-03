const mongoose = require('mongoose')
require('./scores')

mongoose.connect('mongodb://localhost:27017/testScoreDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}, (err) => {
    if (!err) {
        console.log('Database is connected')
    } else {
        console.log('No connection')
    }
})