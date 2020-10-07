const mongoose = require('mongoose')

const connectionstring = require('./default.json')

const db = async() => {
    try{
        await mongoose.connect(connectionstring.mongoDbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Database Connected')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = db;