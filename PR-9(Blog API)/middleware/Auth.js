const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(400).send({
                success : false,
                message : "Token is blank"
            })
        }
        let newtoken = token.slice(7);

        jwt.verify(newtoken,"krishn",(err,decode) => {
            if(err){
                return res.status(400).send({
                    success : false,
                    message : "Invalid Token"
                })
            }
            req.user = decode.payload;
            return next()
        })
        
    } catch (err) {
        return res.status(501).send({
            success : false,
            message : err
        })
    }
}

const Admin = async (req,res,next) => {
    try {
        if(req.user.role != "admin"){
            return res.status(400).send({
                success : false,
                message : "Unauthorised Access"
            })
        }
        return next();

    } catch (err) {
        return res.status(501).send({
            success : false,
            message : err
        })
    }
}

module.exports = {verifyToken , Admin}