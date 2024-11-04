const express=require('express')
const router=require('./routes/index.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const port=4000

const mongoose = require('mongoose')

const dotenv = require("dotenv")

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(router)

mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
        app.listen(4000, (req, res) => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch(err => {
        console.log(err)
    })

