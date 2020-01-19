const router = require('express').Router();
const User = require('../model/User');
const {registervalidation, loginvalidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');


router.post('/register', async (req, res)=>{
    //res.send('register');
    //  console.log(req.body);
    const emailexist = await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send("email exists")
    
    const salt = await bcrypt.genSaltSync(10);
    const HashedPassword = await bcrypt.hashSync(req.body.password,salt);
    
    const {error} = registervalidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
    
     const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: HashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }

});

     router.post('/login',async (req, res)=>{
        
         const user = await User.findOne({email:req.body.email});
         if(!user) return res.status(400).send("email or password is wrong");
   
         const validpass = await bcrypt.compare(req.body.password,user.password);
         if(!validpass) return res.status(400).send("password is wrong");
        
        
          const {error} = loginvalidation(req.body);
          if(error) return res.status(400).send(error.details[0].message);

        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);
     });


module.exports = router;