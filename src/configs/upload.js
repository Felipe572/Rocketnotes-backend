const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

const uploadPath = "D:\\Explorer\\node-js\\tmp\\uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

 
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); 

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file?.originalname || "default.png"}`;

            return callback(null, fileName);
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
 }; 