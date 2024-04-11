const express =  require("express");
const router = express.Router();

const {uploadFile, downloadImage} = require("../controller/fileUpload");
const { upload } = require("../middlewares/upload");


router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:id", downloadImage);


module.exports = router;