let dynamoose = require('dynamoose') ;

const TodoSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true
    },
    text: { type: String},
    isCompleted: {
        type:Boolean,
    default: false
}
}, {
    timestamps: true,
    saveUnknown: true

});

module.exports = dynamoose.model('Todo', TodoSchema);

