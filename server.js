const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connection to db
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParse: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established sucessfully!')
})

const exercicesRouter = require('./routes/exercices')
const usersRouter = require('./routes/users')

app.use('/exercices', exercicesRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Magic happens at port ${PORT}`)
})