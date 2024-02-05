const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')


const validateToken = (req, res, next)=>{
    try{
        
        const accessToken = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(accessToken, "jwtSecret");
        const iduser = decodedToken.iduser; 

        req.auth = {
            iduser: iduser
        };
        console.log("auth.js: " + req.auth.iduser + " sent a request")
        
        next();
    } catch (err){
        return res.status(401).json({error: err});
    }
}


module.exports={ validateToken }