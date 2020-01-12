require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({msg:'Solicitud sin token, acceso denegado'})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg:'Token invalido.'})
    }
}

module.exports = auth