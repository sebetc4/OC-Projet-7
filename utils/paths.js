exports.getImagesPath = (req) => `${req.protocol}://${req.get("host")}/images`
