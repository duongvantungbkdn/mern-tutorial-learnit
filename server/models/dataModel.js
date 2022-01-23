const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    url: {type: String},
    createdAt: {type: Date, default: Date.now()},
    status: {
        type: String,
        enum: ['TO LEARN','LEARNING','LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Datas', dataSchema);
