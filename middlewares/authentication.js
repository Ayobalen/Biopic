const jwt = require("jsonwebtoken");

const verifyToken = function(req, res, next){
    const authHeader = req.headers["authorization"];
    if (authHeader) {
    const token = authHeader.split(" ")[1]
jwt.verify(token, process.env.TOKEN, function(err,user){
    if(err) res.status(403).json("Token isn't valid!");
req.user = user;
next(); 
});
}else
    return res.status(401).json("you are not authenticated!");
}; 

const verifyTokenAndAuthorization =  function(req, res, next){
    try{
        verifyToken( req, res, function(){
            if(req.user.id === req.params.id || req.user.role === 'admin'){
                next();
            } else { 
               res.status(403).json("you are not allowed to do that!");
            }
        });
    }
catch(err){
    res.status(500).json(err);
};
};

    const verifyTokenAndAdmin =  function(req, res, next){
            verifyToken( req, res, function(){
                if(req.user.role = 'admin'){
                    next();
                } else { 
                   res.status(403).json("you are not allowed to do that!");
                }
            });
        }; 
        
module.exports = { verifyToken, verifyTokenAndAuthorization,  verifyTokenAndAdmin };

// const User = require('../model/Usermodel');
// require('dotenv').config();
// const { Strategy, ExtractJwt } = require('passport-jwt');
// const passport = require('passport');

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.TOKEN, // Replace with your own secret key
//   };
// module.exports = (passport) => {
//   passport.use(
//     new Strategy(options, async (payload, done) => {
//       try {
//         const user = await User.findOne({where : {id: payload.id} });
  
//         if (user) {
//           return done(null, user);
//         }
  
//         return done(null, false);
//       } catch (error) {
//         return done(error, false);
//       }
//     })
//   );

//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });
// };
