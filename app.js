const express = require('express')
const app = express()
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const products = require('./routes/products')
const port = 3000 || process.env.port

//  middleware

// for accessing req.body input
app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.send('<h1>store api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', products)

app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async() =>{
    try{
        await connectDB(process.env.URI) // passing the connection string from dotenv file into connectDB function.
        console.log(`connected to db...`)
        app.listen(port, console.log(`listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()


