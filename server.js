require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update with your client's URL
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});


app.use(express.json())

app.use((req,res,next)=> {
 console.log(req.path,req.method)
    next()
})

app.use(usersRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connected to the DB & listening on port',process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })
