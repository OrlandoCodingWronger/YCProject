const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema 생성.
const videoSchema = mongoose.Schema({
   
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // User 스키마에 있는 필드들을 불러올 수 있다.
    },
    title : {
        type : String,
        maxlength : 50
    },
    description : {
        type : String
    },
    privacy : {
        type : Number
    },
    filePath : {
        type : String
    },
    category : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    duration : {
        type : String
    },
    thumbnail : {
        type : String
    }
}, {timestamps : true});
// 비디오 콜렉션 끝.


const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }