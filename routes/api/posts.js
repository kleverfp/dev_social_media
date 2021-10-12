const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');



router.post('/',auth,[
    check('text','Text is required').not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({erros:errors.array()});
    try{
    const user = await User.findById(req.user.id).select('-password');

    const post  = new  Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })

    await post.save();

    res.json(post);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});

router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});

        res.json(posts);    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'server error'});
    }
    
});

router.get('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post)
            return res.status(404).json({msg:'no post found'});

        res.json(post);    
    } catch (error) {

        if(error.kind === 'objectId')
            return res.status(404).json({msg:'no post found'});

        console.error(error.message);
        res.status(500).json({msg:'server error'});
    }
    
});

router.delete('/:id',auth,async(req,res)=>{
    try {
        const post =await  Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({msg:'post not found'});

        if(post.user.toString() !== req.user.id)
            return res.status(401).json({msg:'user not authorized'});
        
        await post.remove();

        res.json({msg:'post removed'});
        
        
    } catch (error) {
        if(error.kind === 'ObjectId')
            return res.status(404).json({msg:'post not found'});

        console.error(error.message);
        res.status(500).json({msg:'server error'});
    }
});

router.put('/like/:id', auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length >0)
            return res.status(400).json({msg:'Post already liked'});

        post.likes.unshift({user:req.user.id});

        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'server error'});
    }
});

router.put('/unlike/:id', auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length ===0)
            return res.status(400).json({msg:'Post has not yet been liked'});

        const postIndex =  post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

        post.likes.splice(postIndex,1);

        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:'server error'});
    }
});

router.post('/comments/:id',auth,[
    check('text','Text is required').not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({erros:errors.array()});
    try{
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);


    const newComment  =   {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);

    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});


router.delete('/comments/:id/:comment_id',auth,async(req,res)=>{

    try{
    
        const post = await Post.findById(req.params.id);
        const comment =post.comments.find(comment=>comment.id === req.params.comment_id);

        if(!comment)
            return res.status(404).json({msg:'commnet does not exist'});
    
       
        if(comment.user.toString() !== req.user.id)
            return res.status(401).json({msg:'user not authorized'});
        
        const indexRemove = post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
        post.comments.splice(indexRemove,1);
    
        await post.save();

        res.json(post.comments);

    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});


module.exports = router;

