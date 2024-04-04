require('express-async-errors')
const Product = require('../models/product')


const getAllProductsStatic = async(req, res)=>{
const products = await Product.find({})
res.status(200).json({products, nbHits:products.length})
}
const getAllProducts = async(req, res)=>{
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {} // The empty query ibject setup is for handling mismatched query objects.
    // setting up the filtering code.
    if (featured){
        queryObject.featured = featured==='true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator]: Number(value)}
            }
        })
        console.log(queryObject)
    }
    let result = Product.find(queryObject)
    // setting up sorting code.
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }
    // default sorting (user did not pass any sort command)
    else{
        result= result.sort('createdAt')
    }
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits:products.length})
}


module.exports = {getAllProductsStatic,
                    getAllProducts}