const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


require('dotenv').config()

// jwt encryption key
const jwt_key = process.env.JWT_KEY

// body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//connecting with database

mongoose.connect(process.env.DB_CONNECTION_URL)
mongoose.connection.once('open',()=>{
    console.log('connected to database')
}).on('error',(err)=>{
    console.log(err)
})


router.get('/all', (req, res)=>{
    User.find().then(users=>{
        res.send(users)
    })
})


router.post('/login',(req,res)=>{
    console.log(req.body)
    User.findOne({email : req.body.email})
    .then(user=>{
        if(user==null){
            res.status(404).json({err : 'email not found'})
        }
        bcrypt.compare(req.body.password, user.password, function (err, result){
            if(user){
                jwt.sign({_id : user._id}, jwt_key, (err,token)=>{
                    if(err){
                        res.status(404).json({err : 'somthing went wrong try again later'})
                    }
                    res.status(200).json({...user, _id:null, password:null,token:token})
                });
            }
            else{
                res.status(404).json({err : 'password is incorrect'})
            }
        })
    }).catch(err=>{
        res.status(404).json({err : 'something went wrong'})
    })
})


router.post('/register', (req,res)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(user!=null){
            res.status(401).send('email already exists')
        }
    })    
        bcrypt.hash(req.body.password, 10, (err,hash)=>{
            User.create({
                ...req.body,
                password : hash,
            })
            .then(user=>{
                res.status(200).json({id : user._id})
            })
        })      
})



module.exports = router;