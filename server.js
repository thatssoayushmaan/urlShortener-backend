
require('dotenv').config()

const login = require('./routes/login')
const signup = require('./routes/signup')
const short = require('./routes/shorturl')


const connectDB = require('./config/db')
connectDB()



const express = require('express')
const app = express()

const cors = require('cors')

const Shorturl = require('./models/Shorturl')



//MiddleWare
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))

app.use('/shorturl', short)
app.use('login', login)
app.use('signup', signup)

app.get('/', (req,res) => {
    res.send("This is the Backend page for URL Shortener")
})

//root routes

app.get('/load', async (req,res) => {
    try {
        let data = await Shorturl.find();
        if (data == null) return res.status(200).json({ message: "data not found" })
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

app.get('/:shorturl', async(req,res) => {
    try {
        let data = await Shorturl.findOne({shortURL : req.params.shorturl})
        if(data === null ) return res.status(404).json({
            message : "URL not found"
        })
        data.clicks++
        data.save()
        res.status(400).redirect(data.fullURL)

    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log('Server Up and Running')
})
