require('dotenv').config()
const jwt = require('jsonwebtoken')


exports.authMiddleware = async(req, res, next) => {
    try{    
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        if(!token){
            return res.status(404).json({
                success: false,
                message: 'Token not found..',
            })
        }
        const payload = await jwt.decode(token, process.env.JWT_SECRET);

        req.userID = payload;
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

