const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product_Schema = new Schema({
    price : {
        type : Number,
        required : true,
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        default : "default"
    },
    description : {
        type : String,
        default : "no description"
    },
    catogory : {
        type : String,
        default : "other"
    },
    brand : {
        type : String,
        default : "unkown"
    },
    rating : {
        type : Number,
        default : 0
    },
    sold : {
        type : Number,
        default : 0
    },
    information : {
        type : Array,
        default : null
    }
})

const Product = mongoose.model("product_module", Product_Schema)

module.exports = Product

/*
  Product.find({
    price : { $lt: product.min_price, $gte: product.max_price },
    name : { $regex: `^$(product.name)`},
    brand : { $regex: `^$(product.brand)`},
    catogory : product.catogory,
  }).sort({
    rating : -1,
    sold : -1
  }).limit(30)
})
*/