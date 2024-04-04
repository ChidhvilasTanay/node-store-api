// for automatically adding the sample values into MongoDB
require('dotenv').config()
const connectDB= require('./db/connect')
const Product = require('./models/product')
const sampleProducts = require('./products.json')
const start = async(URI)=>{
try{
    await connectDB(process.env.URI)
    await Product.deleteMany()
    await Product.create(sampleProducts)
    process.exit(0)
  }
catch(error){
    console.log(error)
    process.exit(1)
   }
}

start()