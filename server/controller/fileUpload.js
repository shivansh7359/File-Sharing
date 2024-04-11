const File = require("../models/file");


exports.uploadFile = async(req, res) => {
    try{
        // console.log(req);
        const fileObj = {
            path: req.file.path,
            name: req.file.originalname
        }

        const file = await File.create(fileObj);
        // console.log(file);
        return res.status(200).json({
            "path": `http://localhost:4000/file/${file._id}`,
        });
    }
    catch(error){
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}

exports.downloadImage = async(req,res) => {
    try{

        const id = req.params.id;
        
        const savedFile = await File.findById(id);

        savedFile.downloadContent++;

        await savedFile.save();

        res.download(savedFile.path, savedFile.name);
    }
    catch(err){
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}