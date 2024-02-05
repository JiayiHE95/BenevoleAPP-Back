const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')


const validateToken = (req, res, next)=>{
    try{
        
        const accessToken = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
        console.log("coucou")
        console.log(req.headers.authorization)
        console.log("coucou2")
        console.log(req.headers.authorization.split(' '))
=======
        console.log(req.headers.authorization.split(' '))
        console.log(jwt.decode(accessToken));

>>>>>>> 48b0311ab4235176dc2a02034facfd66f65bf41f
        const decodedToken = jwt.verify(accessToken, "jwtSecret");

        console.log(decodedToken)


        const iduser = decodedToken.iduser; 

        req.auth = {
            iduser: iduser
        };
        console.log("auth.js: " + req.auth.iduser + " sent a request")
        
        next();
    } catch (err){
        console.error("Error verifying token:", err);
        return res.status(401).json({error: err});
    }
}


module.exports={ validateToken }