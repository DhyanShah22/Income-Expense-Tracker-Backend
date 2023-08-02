const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const expRoutes = require('./Routes/expenseRoutes')
const incRoutes = require('./Routes/incomeRoutes')
const app = express()
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/expense', expRoutes)
app.use('/api/income', incRoutes)
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })