const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/mernLearn',{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('Connect successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
