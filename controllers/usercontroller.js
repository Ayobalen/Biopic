const bcrypt = require('bcryptjs');
const User = require('../model/Usermodel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.CreateUser = async (role, req, res) => {
    
    const {fullname, email, password} = req.body;

    try{
        await User.findOne({ 
            where: {
                email: `${email}` 
                }
            }).then(async (user) => {
                if(!user){
                    const salt = await bcrypt.hash(password, 10)
                    const hashedPass = await bcrypt.hash(password, salt);
                    
                    user = new User({
                        fullname,
                        email,
                        role,
                        password: hashedPass
                    });
                
                    await user.save();
                    return res.status(200).send(user);
                    
                } else{
                    return res.status(400).send("user already exist, please change the email")
                };
         });

    } catch(err){
        console.log(err);
        return res.status(404).send({
            status: 'fail',
            message: err
        });
    }
};
exports.LoginUser = async (role, req, res) => {
  try{

      const {email, password } = req.body;
      await User.findOne({ where: {
          email: `${email}` 
      }
      })
      .then(async (user) => {
          if(!user){
            return res.status(400).json('user does not exist');
          }
  
          if(user.role !== role){
              return res.status(403).json({
                  message: "You are not allowed here",
                  success: false
              });
          }
          const validate = await bcrypt.compare(password, user.password);
          if(validate){
            const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN,  {expiresIn:"3d"});
  
              let result = {
                  fullname: user.fullname,
                  username: user.username,
                  role: user.role,
                  token: accessToken
              };


  
             return res.status(200).json({
                  ... result,
                  status: "Logged in successfully",
                  success: true
              });
  
          } else{
             return res.status(400).json({
                  message: 'wrong password, please check and try again',
                  success: false
              });
          }
      })
      


  } catch(err){
     return res.status(404).json({
          status: 'fail',
          message: err
        });
  }
};
