const multer = require('multer');
const fs = require('fs');
const path = require("path");
const { extname } = require('path');
function fileFilter(res, file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|zip|pdf|xlsx|xlsb|xls|doc|docm|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (extname) {
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