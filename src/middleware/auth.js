const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')


// authMiddleware.js

const handle401Error = (err, req, res, next) => {
    if (err.status === 401) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    next(err);
};



const validateToken = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, "jwtSecret");
        const iduser = decodedToken.iduser;

        req.auth = {
            iduser: iduser
        };
        console.log("auth.js: " + req.auth.iduser + " sent a request");

        next();
    } catch (err) {
        console.error("Error in validateToken middleware:", err);
        return res.status(401).json({ error: "Unauthorized" });
    }
};


module.exports={ validateToken, handle401Error}