/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
import {Card, Avatar, Col, Typography, Row} from 'antd';
// import Icon from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() =>{
        //DOM이 로드되자마자 무엇을 한번 할 것인지 정하게 됨.

        const subscriptionVariables ={
            userFrom : localStorage.getItem('userId')
        }

        axios.post('/api/video/getSubscriptionVideos', subscriptionVariables )
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setVideo(response.data.videos);
            }else{
                alert('비디오 가져오기를 실패 하였습니다.')
            }
        })
    },[]);


    const renderCards = Video.map((video,index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return  <Col lg={6} md={8} xs={24}> {/*반응형 디자인을 위한 코드.*/}
        <a href={`/video/${video._id}`}>
            <div style={{ position: 'relative'}}>
                <img style={{ width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <div className="duration">
                    <span>{minutes}:{seconds}</span>
                </div>
            </div>
        </a>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            }
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span> <br />
        <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
    </Col>
    })

    return (
       <div style={{width:'85%', margin: '3rem auto'}}>
           <Title level={2}> Subscribed </Title>
            <hr />
            <Row gutter={[32, 16]}>

                {renderCards}
               



            </Row>
       </div>
    )
}

export default SubscriptionPage
