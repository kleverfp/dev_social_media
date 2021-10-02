const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');



router.get('/',(req,res)=>{
    res.json({msg:"user route"});
});

router.post('/',[
    body('name','name is required').trim().not().isEmpty(),
    body('email','please include a valid email').isEmail(),
    body('password','please enter a password with 6 or more characters').isLength({min:6})

],(req,res)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({erros:erros.array()});
    }

    console.log(req.body);
    res.json({msg:"ok"});
   
})


module.exports = router;

