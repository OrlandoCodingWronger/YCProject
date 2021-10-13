import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId; // app.js에서 설정해놨기 때문에 가능함.
    const variable ={ videoId: videoId };
    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() =>{
        axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                setVideoDetail(response.data.videoDetail);
            }else{
                alert('비디오 정보를 가져오는데 실패 하였습니다.');
            }
        })
    })

    if (VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !==
            localStorage.getItem('userId') &&(
            <Subscribe 
                userTo={VideoDetail.writer._id} 
                userFrom={localStorage.getItem('userId')} 
            /> // 만약 페이지의 동영상이 본인의 동영상이면, 구독버튼을 보이지 않게 함.
        );
        //writer를 서버에서 가져오기 전에 페이지를 렌더링 하려고 하여, 
        //VideoDetail.writer.image 부분에서 type error가 발생함.
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24} >
                    <div style={{ width: '100%', padding:'3rem 4rem'}}>
                        <video 
                            style={{width: '100%'}} 
                            src={`http://localhost:5000/${VideoDetail.filePath}`} 
                            controls 
                        />
                        <List.Item actions={[subscribeButton]}>
                            <List.Item.Meta 
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        
                        {/* Comments */}
                        <Comment />
    
                    </div>
                </Col>
                <Col lg={6} xs={24} >
                    <SideVideo />
                </Col>
            </Row>
        )
    }else{
        return (
            <div> loading ...</div>
        );
    };

   
}

export default VideoDetailPage
