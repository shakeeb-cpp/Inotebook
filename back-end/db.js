const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongooseURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&tls=false&directConnection=true';

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () => {
        console.log('connect to mongo successfully!')
    });
}

module.exports = connectToMongo;