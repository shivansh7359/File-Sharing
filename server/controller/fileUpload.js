const File = require("../models/file");


exports.uploadFile = async(req, res) => {
    try{
        const fileObj = {
            path: req.file.path,
            name: req.file.originalname
        }

        const file = await File.create(fileObj);
        if(file){
            res.status(200).json({
                data: file,
                "path": `http://localhost:4000/api/file/${file._id}`,
            });

            setTimeout(async() => {
                try{
                    await File.findByIdAndDelete(file._id);
                }catch(e){
                    console.log(`Error while deleting file with ID: ${file._id}`)
                }
            }, 60000)
        }else{
            return res.status(404).json({
                status: false,
                message: 'Some error occured while uploading file. Please try again later.'
            })
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.downloadImage = async(req,res) => {
    try{
        const id = req.params.id;
        const savedFile = await File.findById(id);

        if(savedFile){
            // savedFile.downloadContent++;
            await savedFile.save();
            res.download(savedFile.path, savedFile.name);
        }else{
            return res.status(404).json({
                success: false,
                message: 'File not found.'
            })
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong while downloading file."
        });
    }
}