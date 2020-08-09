const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product')
const multer = require('multer')
const bodyParser = require('body-parser')

// body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//connecting with database
mongoose.connect(process.env.DB_CONNECTION_URL)
mongoose.connection.once('open',()=>{
    console.log('connected to database')
}).on('error',(err)=>{
    console.log(err)
});

// file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, randomNumber()+'-'+ Date.now())
    }
  })
   
const upload = multer({ storage: storage })


//handling request

router.get("/all", (req, res) => {
  Product.find().then(products=>{
    res.send(products)
  })
})

router.get("/remove", (req, res) => {
  Product.remove().then(products=>{
    res.send(products)
  })
})
// ()
router.get("/filter", (req, res)=>{
  const product = req.query
  if(!product) return res.status(404).json({err : "did not get required data"})
  
  Product.find(setQuery(product)).sort({
    rating : -1,
    sold : -1
  }).limit(30)
  .then(products=>{
    res.status(200).json({products})
  })
  .catch(ex =>{
    res.status(400).json({err : ex})
  })
})

router.post("/add", upload.single('image'),(req, res) => {
  try{
    const image = req.file.filename
    req.body.image = image
  }
  catch(exc){}
  finally{
    Product.create(req.body).then(result=>{
        if(result){
          res.status(200).json({success : true})
        }
        else{
          res.status(400).json({success : false})
        }
    })
  }
});

function setQuery(product){
  let query = {}
  if(product.min_price) query.price = { $lt: product.min_price, $gte: product.max_price }
  if(product.name) query.name = { $regex: `^${product.name}`}
  if(product.brand) query.name = { $regex: `^${product.brand}`}
  if(product.catogory) query.catogory = product.catogory
  return(query)
}

module.exports = router;