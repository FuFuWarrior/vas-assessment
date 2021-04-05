const multer = require("multer");
const MIMES_TYPE = {
    "image/jpg":"jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
};

let name = "devstory"
const storage = multer.diskStorage({
    // Set file destination
    destination: (req, file, callback) => {
    callback(null, "./src/IMAGES");
    },
    filename: (req, file, callback) => {
        const extension = MIMES_TYPE[file.mimetype];
        req.extension = extension;
        const newName = name + Date.now() + "-" + file.originalname;
        // console.log(req.files)
        callback(null, newName);
    }
});

// file validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")  {
        req.mediaType = "image";
        cb(null, true);
    }else{
        cb("Unsupported format", false);
    }
}

module.exports = multer({
    storage,
    // limits is 8 MB in size
    limits: {fileSize: 8 * (1024 * 1024)},
    fileFilter
})



module.exports = multer({storage:storage}).array(
    'images',
    'product_name', 
    'product_description', 
    'date_uploaded', 
    'date_edited', 
    'product_varieties',
    'size',
    'colour',
    'quantity',
    'prices',
)