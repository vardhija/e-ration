const jwt = require ("jsonwebtoken");

//Authentication middleware
exports.requireLogin = (req, res, next)=>{
  try{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        //verifying the extracted token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //Attching the token with the request
        req.user = decode;
        next();
      }
      else{
        return res.status(400).json({message: "Unauthorized"});
      }

  }catch(e){
    console.log("Authorization has failed")
  }
}
