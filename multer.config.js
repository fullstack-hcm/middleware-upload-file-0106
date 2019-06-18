const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
  
const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype === 'image/jpeg' || mimetype === 'image/png') 
    cb(null, true);
  cb(new Error('input_not_valid'));
}
var upload = multer({ storage, fileFilter })

module.exports = upload;
