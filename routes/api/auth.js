const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

router.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(user)
           return res.json(user);

    } catch (err) {
        console.log(err.message);
        res.send(500).json({msg:'server error'});
    }
});


router.post('/',[
    body('email','please include a valid email').isEmail(),
    body('password','password is required').exists()

],async (req,res)=>{
   
    const erros = validationResult(req);
    if(!erros.isEmpty())
        return res.status(400).json({erros:erros.array()});
    

    const {email,password} = req.body;
   
    try{
       
        let user = await User.findOne({email});
        
        if(!user)
            return res.status(400).json({errors:[{msg:'email or password are incorrects'}]});
        
    
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch)
            return res.status(400).json({errors:[{msg:'email or password are incorrects'}]});
        
        const payload ={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        });

    }catch(err){
        console.error(err.message);
    }
   
})


module.exports = router;

