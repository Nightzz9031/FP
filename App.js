const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require('./src/routes/router');
const { default: mongoose } = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin@cluster0.jrjkolc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log('CONNECTED TO MONGODB')
    }).catch(e => {
    console.log('CONNECTION ERROR')
})

app.use(cors())
app.listen(4000)
app.use(express.json())
app.use('/', mainRouter) 

const recipeSchema = require('./src/schemas/recipeSchema')
const userSchema = require('./src/schemas/userSchema')


