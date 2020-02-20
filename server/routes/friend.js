const router = require('express').Router()
const auth = require('../middleware/auth')

//Friend model
const Friend = require('../models/Friend')

router.get('/', auth, async (req, res) => {
    try {
        const friends = await Friend.find()
        res.json(friends)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.id)
        if (!friend) {
            return res.status(404).json({msg: 'Friend not found'})
        }
        res.json(friend)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


router.post('/', auth,
async (req, res) => {

    const { owner, friends } = req.body

    try {
        let friend = new Friend({
            owner,
            friends
        })

        friend = await friend.save()

        res.json(friend)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let friend = await Friend.findById(req.params.id)
        if (!friend) {
            return res.status(404).json({msg:'Friend not found'})
        }
        await Friend.findByIdAndRemove(req.params.id)
        res.send('Friend removed successfully')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const {owner, friends} = req.body
    const updatedFriend = {owner, friends}

    try {
        let friend = Friend.findById(req.params.id)
        if (!friend) {
            return res.status(404).json({msg: 'Friend not found'})
        }

        friend = await Friend.findByIdAndUpdate(req.params.id, {$set: updatedFriend}, {new: true})

        res.send(friend)

    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error') 
    }  
})

module.exports = router