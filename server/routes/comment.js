const router = require('express').Router()
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')

//Comment model
const Comment = require('../models/Comments')

router.get('/', auth, async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({msg: 'Comment not found'})
        }
        res.json(comment)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


router.post('/', auth,
[
    check('content','Please provide a content text').not().isEmpty()
],
async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({error: errors.array()})
    }

    const { content, postParent } = req.body

    try {
        let comment = new Comment({
            user: req.user.id,
            content,
            postParent
        })

        comment = await comment.save()

        res.json(comment)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let comment = await Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({msg:'Comment not found'})
        }
        await Comment.findByIdAndRemove(req.params.id)
        res.send('Comment removed successfully')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const {content} = req.body
    const updatedComment = {content}

    try {
        let comment = Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({msg: 'Comment not found'})
        }

        comment = await Comment.findByIdAndUpdate(req.params.id, {$set: updatedComment}, {new: true})

        res.send(comment)

    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error') 
    }  
})

module.exports = router