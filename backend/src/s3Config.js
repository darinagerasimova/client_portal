import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    s3BucketEndpoint: true,
    endpoint: process.env.ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
})
