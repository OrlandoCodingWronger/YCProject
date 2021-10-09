/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(()=>{

        let variable ={userTo: props.userTo}

        axios.post('/api/subscribe/subscribeNumber', variable)
        .then (response=>{
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber);
            }else{
                alert('구독자 수 정보를 받아오지 못했습니다.');
            };
        });

        let subscribedVariable = { 
            userTo: props.userTo ,
            userFrom : localStorage.getItem('userId') // 로그인시 넣어놓은 userId 값을 불러옴
        };

        axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response=>{
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            }else{
                alert('정보를 받아오지 못했습니다.');
            }
        })
    }, []);

    const onSubscribe=() =>{
        let subscribeVariable ={
            // 제 자신의 아이디, 포스트 작성자의 아이디가 필요
            userTo: props.userTo , 
            userFrom: props.userFrom
        }

        // 이미 구독중이라면,
        if(Subscribed){

            axios.post('/api/subscribe/unSubscribe', subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);
                }else{
                    alert('구독 취소 하는데 실패하였습니다.')
                }
            })

        // 구독 중이 아니라면,    
        }else{

            axios.post('/api/subscribe/Subscribe', subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                }else{
                    alert('구독 하는데 실패하였습니다.')
                }
            })

        };
    };

    return (
        <div>
            <button
                style={{ 
                    backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, 
                    borderRadius: '4px',
                    color: 'white', 
                    padding: '10px 16px',
                    fontWeight: '500', 
                    fontSize: '1rem', 
                    textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
