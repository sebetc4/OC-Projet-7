require('dotenv').config()
const imageType = require('image-type');
const S3 = require('aws-sdk/clients/s3')

const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

const ckeckAllowedFile = (file) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const type = imageType(file.buffer)
    if (!(type && filetypes.test(type.mime) && filetypes.test(type.ext)))
        return false
    else
        return true
}

exports.uploadFile = async (file) => {
    if (!ckeckAllowedFile(file))
        throw { message: 'Image format not allowed' }
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: Date.now() + '-' + file.originalname,
        acl: 'public-read',
    }
    return s3.upload(uploadParams).promise()
}

exports.deleteFile = (path) => {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `folder/subfolder/filename.fileExtension`
    }
    s3.deleteObject(deleteParams, (error) => {
        if (error)
            throw { message: 'Impossible de supprimer l`\'image' }
    })
}


