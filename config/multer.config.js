// Import
const multer = require("multer");

// Middleware de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        callback(null, Date.now() + '-' + name);
    },
});
module.exports = multer({ storage }).fields([{name: 'avatar', maxCount: 1}, {name: 'cover', maxCount: 1}]);
