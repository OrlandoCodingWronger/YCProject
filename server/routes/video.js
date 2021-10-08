const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");




// Storage multer config

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },      // 12월 20일이라면 1220어쩌구.오리지널네임
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4' || ext !== '.mkv'){
            return cb(res.status(400).end('only mp4, mkv is allowed'),false);
        }
        cb(null, true);
    }
});
// Config 옵션 끝.

const upload = multer({storage:storage}).single("file");

//=================================
//             Video
//=================================
// 인덱스에서 '/api/video'는 이미 입력이 되어 있기 때문에, 거기서 타고 들어오는 경우 앞의 api,video 생략한 경로를 적어주면 된다. 

router.post('/uploadfiles',(req, res)=>{
    //req에는 클라이언트에서 보내온 것들 즉 파일을 받으면 됨, 
    upload(req, res, err => {
        if(err){
            return res.json({success: false, err});
        }
        return res.json({
            success: true, 
            url: res.req.file.path, 
            filename: res.req.file.filename 
        })
        // 업로드 후, 파일이 저장된 위치를 보내주기 위한 코드
    });
    //클라이언트에서 받은 비디오를 저장. 
});

router.post('/uploadVideo',(req, res)=>{
   // 비디오 정보들을 저장한다. 클라이언트 측에서 보낸 모든 정보(variables)를 Request.body 를 통하여 받는다.
   const video = new Video(req.body);

   video.save((err, doc)=>{
       if(err) return res.jason({success: false, err});
       res.status(200).json({success: true});
   });

});

router.get('/getVideos',(req, res)=>{
    // 비디오를 DB에서 가져와서 클라이언트에 보낸다.

    Video.find()
        .populate('writer') // populate 하지 않으면 라이터의 아이디만 가져온다.
        .exec((err, videos)=> {
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, videos});
        });
    
 
 });

router.post('/thumbnail',(req, res) => {

    // 썸네일 생성 하고 비디오 러닝타임도 가져오기.

    let thumbsFilePath ="";
    let fileDuration ="";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err,metadata){
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });
    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames){
            console.log('Will generate' + filenames.join(', '));
            console.log(filenames);

            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function(){
            console.log('Screenshots taken');
            return res.json({
                success: true, 
                thumbsFilePath: thumbsFilePath,  
                fileDuration: fileDuration });
        })
        .on('error', function(err){
            console.log(err);
            return res.json({success: false, err});
        })
        .screenshots({
            //Will take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // '%b': input basename (filename 확장자를 제외한.) 
            filename: 'thumbnail-%b.jpg'
    });
});

module.exports = router;
