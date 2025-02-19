const jwt = require('jsonwebtoken');
JWT_SECRET="Ujjwal123";


function authMiddleware(req,res,next){
    const token = req.headers.authorization;
    
    if(!token)
    {
        return res.json({
            message:"Please Log in"
        })
    }

    const decoded=jwt.verify(token,JWT_SECRET);   
    console.log(decoded);
    
    if(decoded){
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            message:"Invalid Token"
        });
    }
}

module.exports=authMiddleware;