const express = require('express');
const app = express();
const user = require('./routes/user');
const product = require('./routes/product');
const auth = require('./middle-ware/auth');
require('dotenv').config()
const http = app.listen(process.env.PORT || 5000);


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Lang'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
})

app.use('/api/user', user)
app.use('/api/product', product)


app.get('/', (req,res)=>{
    res.send('server is running...')
})

app.get('/auth', auth, (req,res)=>{
    res.send('authenticated '+JSON.stringify(req.token) )
})

