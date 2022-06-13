require('dotenv').config()
const multer = require("multer");

const storage = process.env.NODE_ENV === 'production' ?
    multer.memoryStorage()
    :
    multer.diskStorage({
        destination: (req, file, cb) => {
            const directory = file.fieldname
            cb(null, `images/` + directory);
        },
        filename: (req, file, cb) => {
            const name = file.originalname.split(" ").join("_");
            cb(null, Date.now() + '-' + name);
        },
    });

module.exports = multer({ storage, limits: { fileSize: 4194304 }}).fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }, { name: 'post', maxCount: 1 }]);
