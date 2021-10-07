/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label:"Private"},
    {value: 1, label:"Public"}
];
const CategoryOptions = [
    {value: 0, label:"Film & Animation"},
    {value: 1, label:"News"},
    {value: 2, label:"Sports"},
    {value: 3, label:"Pets & Animals"},
    {value: 4, label:"IT"},
    {value: 5, label:"Music"},
    {value: 6, label:"Games"},
    {value: 7, label:"Autos & Vehicles"},
];


// 1.먼저 펑셔널 컴포넌트를 만든 뒤,
function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");


    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value);
    };

    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value);
    };

    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value);
    };

    const onCategoryChange =(e) =>{
        setCategory(e.currentTarget.value);
    };

    const onDrop = (files) => {
        // files 패러미터에는 업로드한 파일의 정보가 들어가 있게 된다.
        let formData = new FormData();
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("file", files[0]);
        // Array로 한 이유는, 첫번째 데이터를 가져오기 위함임.
        
        Axios.post('/api/video/uploadfiles', formData, config)
            .then((response) => {
                if(response.data.success){
                    let variable = {
                        url: response.data.url,
                        fileName: response.data.filename
                    };
                    setFilePath(response.data.url);

                Axios.post('/api/video/thumbnail', variable)
                    .then((response) => {
                        if(response.data.success){
                            // 비디오 정보를 State에 저장하자.
                            setDuration(response.data.fileDuration);// 동영상 길이
                            setThumbnailPath(response.data.thumbsFilePath); // 썸네일 주소
                            console.log(response.data);
                        }else{
                            alert('썸네일 생성에 실패 했습니다.')
                        }
                    })

                } else{
                    alert('비디오 업로드에 실패하였습니다.')
                }
            })

        // 서버에 리퀘스트를 보낼 예정이다.
        // axios.post로 보내지 않으면 오류가 생긴다.
    }

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Your Video!</Title>
            </div>

                <Form onSubmit>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {/* Drop Zone */}

                        <Dropzone 
                            onDrop ={onDrop}
                            multiple ={false}
                            maxSize = {1000000000000000}
                        >
                            {({getRootProps, getInputProps})=>(
                                <div 
                                    style={{
                                        width:'300px', 
                                        height:'240px',
                                        border:'1px solid lightgray', 
                                        display:'flex',
                                        alignItems:'center', 
                                        justifyContent:'center'
                                    }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                        <PlusOutlined style={{fontSize:'3rem'}} />
                                </div>
                            )}
                        </Dropzone>

                        {/* Thumnail */}
                        
                        {ThumbnailPath &&
                            <div>
                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                            </div>
                        };
                    </div>

                    <br />
                    <br />
                    <label>Title</label>
                    <Input 
                        onChange ={onTitleChange}
                        value ={VideoTitle}
                    />
                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value = {Description}
                    />
                    <br />
                    <br />

                    <select onChange={onPrivateChange}>
                        {PrivateOptions.map((item, index)=>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>

                    <br />
                    <br />

                    <select onChange={onCategoryChange}>
                        {CategoryOptions.map((item, index)=>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>

                    <br />
                    <br />

                    <Button type="primary" size="large" onClick>
                        Submit
                    </Button>
            

                </Form>
            
        </div>
    )
}
// 2.다른 곳에서도 사용할 수 있도록 익스포트.
export default VideoUploadPage
