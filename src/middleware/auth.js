const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')

const createTokens = (user)=>{
    console.log('JWT_SECRET:', process.env.JWT_SECRET||"clesecrete");
    const accessToken = sign({ iduser: user.iduser},process.env.JWT_SECRET||"clesecrete"  ,{ expiresIn: '24h'})
    return accessToken;
}

const validateToken = (req, res, next)=>{
    try{
        
        const accessToken = req.headers.authorization.split(' ')[1];   
        
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET||"clesecrete");
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

module.exports={ createTokens, validateToken}