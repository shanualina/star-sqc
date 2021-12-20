const multer = require('multer');
const fs = require('fs');
const { extname } = require('path');
const path = require("path");
const aws = require('aws-sdk');
function fileFilter(res, file, cb) {
    // Allowed ext
    const filetypes = /mp4|MPEG-4|mkv/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const limits = {
    fieldNameSize: 200,
    files: 20,
    fields: 20
}
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + extname(file.originalname));
    }
});

const imagesUpload = {
    fileFilter: fileFilter,
    storage: storage,
    limits: limits
};

module.exports.imagesUpload = imagesUpload;


// method
// aws.config.setPromisesDependency();
// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const s3 = new aws.S3();
// var params = {
//     ACL: 'public-read',
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Body: fs.createReadStream(req.file.path),
//     Key: `images/${req.file.filename}`
// };
// s3.upload(params, (err, data) => {
//     if (err) {
//         // console.log(error)('Error occured while trying to upload to S3 bucket', err);
//     }
//     if (data) {
//         fs.unlinkSync(req.file.path); // Empty temp folder
//         const locationUrl = data.Location;
//     }
// })