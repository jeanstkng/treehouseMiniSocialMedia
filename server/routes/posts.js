const router = require('express').Router()
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')

//Post model
const Post = require('../models/Post')

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


router.post('/', auth,
[
    check('title','Please provide a title').not().isEmpty(),
    check('contentText','Please provide a content text').not().isEmpty()
],
async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({error: errors.array()})
    }

    const { title, contentText } = req.body

    try {
        let post = new Post({
            user: req.user.id,
            title,
            contentText
        })

        post = await post.save()

        res.json(post)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg:'Post not found'})
        }
        await Post.findByIdAndRemove(req.params.id)
        res.send('Post removed successfully')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const {title, contentText, points} = req.body
    const updatedPost = {title, contentText, points}

    try {
        let post = Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        post = await Post.findByIdAndUpdate(req.params.id, {$set: updatedPost}, {new: true})

        res.send(post)

    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error') 
    }  
})

module.exports = router