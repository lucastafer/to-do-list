const mongoose =  require('mongoose')

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {Boolean, default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)
