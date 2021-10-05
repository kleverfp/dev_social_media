const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');


router.get('/',auth,async (req,res)=>{
    try {
        const user = User.findById(req.user.id).select('-password');
        if(user)
            res.send(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.send(500).json({msg:'server error'});
    }
});


module.exports = router;

