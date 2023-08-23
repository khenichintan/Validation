const multer = require("multer");

const path = require('path');

const updata = "/upload/user";

const imagepath = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', updata));
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '-' + Date.now());
    }
});

module.exports.upimage = multer({ storage: imagepath }).single('image');
module.exports.updata = updata;