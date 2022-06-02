require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const s3 = new S3({
    region: 'eu-west-3',
    accessKeyId: 'AKIA2ZJ5PBGE5MPEN3NO',
    secretAccessKey: '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'
})

exports.uploadFile = (file) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: file.originalname,
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


