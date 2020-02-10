const express = require('express')
const app = express()

//Conectar a la base de datos
const connectDB = require('./config/db')
connectDB()

app.use(express.json({extended: true}))

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/post', require('./routes/posts'))


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server initialized at ${PORT}`))