const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // setting up properties and validators
    name:{
        type:String,
        required:[true, 'name section cannot be empty'],
        trim:true
    },
    price:{
        type:Number,
        required:[true, 'name section cannot be empty']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:2.5
    },
    createAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product', productSchema)