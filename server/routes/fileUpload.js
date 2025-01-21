const express =  require("express");
const router = express.Router();

const {uploadFile, downloadImage} = require("../controller/fileUpload");
const { upload } = require("../middlewares/upload");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/:id", downloadImage);


module.exports = router;