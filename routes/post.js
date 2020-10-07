const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Post = require("../models/Posts");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const Posts = require("../models/Posts");
const { route } = require("./profile");

// @route  GET api/posts/
// @desc   Get all the posts
// @access private

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });

    if(!posts){
        return res.status(404).send('Post not found')
    }
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/posts/
// @desc   Save a post
// @access private
router.post(
  "/",
  authMiddleware,
  [body("text").not().isEmpty().withMessage("Post text is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id, name, avatar } = req.user;

      const postData = {
        user: id,
        text: req.body.text,
        name:name,
        avatar:avatar
      };

      const newPost = new Post(postData);
      await newPost.save();

      res.status(200).send("Post added");

    } catch (err) {
      console.log(err);
      res.status(400).send("server error");
    }
  }
);

// @route  DELETE api/posts/:postId
// @desc   Delete Post
// @access private

router.delete('/deletepost/:postId', authMiddleware, async (req,res) => {
    try{
        const post = await Posts.findOne({_id: req.params.postId})
        if(!post){
            return res.status(404).send('Post Not Found')
        }
       await Posts.findByIdAndDelete(req.params.postId);
       res.status(200).send('Post Deleted')
    }catch(err){
        console.log(err);
        res.status(400).send('Server Error')
    }
})

// @route  POST api/posts/like/:postid
// @desc   Like dislike post
// @access private

router.put('/like/:postId', authMiddleware, async(req, res) => {
    try{
        const {postId} = req.params;
        
        const post = await Posts.findOne({_id: postId});
        
        if(post.likes.length == 0)
        {
        post.likes.push({user: req.user.id});
        await post.save();
        return res.status(200).send(post)
        }

        const userindex = post.likes.indexOf(post.likes.find(like => like.user === req.user.id))
        post.likes.splice(userindex,1);
        await post.save();
        res.status(200).send(post);

    }catch(err){
      console.log(err);
      res.status(500).send('Server Error')
    }
})

// @route  PUT api/posts/comment/:postid
// @desc   comment on post
// @access private

router.put('/comment/:postid', authMiddleware, [
  body('text').not().isEmpty().withMessage('Please enter a comment')
], async (req, res) => {
  try{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {text} = req.body;
 
    const post = await Posts.findOne({_id: req.params.postid})
    console.log(post.comments)
    
    post.comments.unshift({
      user: req.user.id,
      text: text,
      name: req.user.name,
      avatar: req.user.avatar
    })

    await post.save();

    res.status(200).send('Comment Added')
  }
  catch(err){
    console.log(err);
    res.status(500).send('server error');
  }
})

// @route  PUT api/posts/comment/:postid
// @desc   comment on post
// @access private

router.delete('/comment/:postid/:commentid', authMiddleware, async (req, res) => {
  try{
    const post = await Posts.findOne({_id:req.params.postid});

    const index = post.comments.indexOf(post.comments.find(comment => comment._id == req.params.commentid));

    console.log(index)

    post.comments.splice(index, 1)

    console.log(post)

    await post.save();

    res.status(200).send('comment deleted');

  }catch(err){
    console.log(err);
    res.status(500).send('server error');
  }
})

module.exports = router;
