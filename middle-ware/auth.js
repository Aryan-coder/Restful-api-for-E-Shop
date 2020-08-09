const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports =  function auth(req, res, next){
    const varified = jwt.verify(req.body.token, process.env.JWT_KEY)
    console.log(varified)
    if (!varified) res.status(403)
    req.token = varified
    next()
}