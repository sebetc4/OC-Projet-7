require('dotenv').config()
const multer = require("multer");

// Middleware de multer
const storage = process.env.NODE_ENV === 'production' ?
    multer.memoryStorage()
    :
    multer.diskStorage({
        destination: (req, file, callback) => {
            const directory = file.fieldname
            callback(null, `images/` + directory);
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(" ").join("_");
            callback(null, Date.now() + '-' + name);
        },
    });

module.exports = multer({ storage }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }, { name: 'post', maxCount: 1 }]);
