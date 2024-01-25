const jwt = require ('jsonwebtoken')


function verifyToken(req,res,next){
const token = req.header('Authorization')


if(!token)
return res.status(401).json({error:"access denied"})
try {
    const decoded = jwt.verify(token,'secret_key')
    req.userId = decoded.userId
    next()
} catch (error) {
    console.log(error);
    // res.status(401).json({error:"invalid"})
    
}
}

module.exports = verifyToken