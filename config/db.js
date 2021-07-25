const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.URL, {
        useUnifiedTopology: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    console.log("MongoDB connected")
}

module.exports = connectDB