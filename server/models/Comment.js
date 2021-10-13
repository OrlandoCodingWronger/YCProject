const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema 생성.
const commentSchema = mongoose.Schema({
   writer : {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Video'
   },
   responseTo : {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   content: {
       type: String
   }
}, {timestamps : true});


const comment = mongoose.model('comment', commentSchema)

module.exports = { comment }