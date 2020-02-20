const router = require('express').Router()
const auth = require('../middleware/auth')

// RequestFriend model
const RequestFriend = require('../models/RequestFriend')

router.get('/', auth, async (req, res) => {
    try {
        const requestFriends = await RequestFriend.find()
        res.json(requestFriends)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const requestFriend = await RequestFriend.findById(req.params.id)
        if (!requestFriend) {
            return res.status(404).json({msg: 'Request not found'})
        }
        res.json(requestFriend)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


router.post('/', auth,
async (req, res) => {

    const { sender, receiver, isCanceled, isAccepted } = req.body

    try {
        let requestFriend = new RequestFriend({
            sender,
            receiver,
            isCanceled,
            isAccepted
        })

        requestFriend = await requestFriend.save()

        res.json(requestFriend)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let requestFriend = await RequestFriend.findById(req.params.id)
        if (!requestFriend) {
            return res.status(404).json({msg:'Request not found'})
        }
        await RequestFriend.findByIdAndRemove(req.params.id)
        res.send('Request removed successfully')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const {sender, receiver, isCanceled, isAccepted} = req.body
    const updatedRequest = {sender, receiver, isCanceled, isAccepted}

    try {
        let requestFriend = RequestFriend.findById(req.params.id)
        if (!requestFriend) {
            return res.status(404).json({msg: 'Request not found'})
        }

        requestFriend = await RequestFriend.findByIdAndUpdate(req.params.id, {$set: updatedRequest}, {new: true})

        res.send(requestFriend)

    } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error') 
    }  
})

module.exports = router