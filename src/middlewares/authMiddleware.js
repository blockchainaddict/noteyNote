function authMiddleware(req,res,next){
    if(req.session.userToLog != undefined){
        next();
    }
    else{
        res.send('Page for users, create an account');
    }
}

module.exports = authMiddleware;