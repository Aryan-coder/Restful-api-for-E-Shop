const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, randomNumber()+'-'+ Date.now())
    }
  })
   
const upload = multer({ storage: storage })

module.exports = upload;