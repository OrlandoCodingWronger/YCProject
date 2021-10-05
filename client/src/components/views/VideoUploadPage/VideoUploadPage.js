import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label:"Private"},
    {value: 1, label:"Public"}
]
const CategoryOptions = [
    {value: 0, label:"Film & Animation"},
    {value: 1, label:"News"},
    {value: 2, label:"Sports"},
    {value: 3, label:"Pets & Animals"},
    {value: 4, label:"IT"},
    {value: 5, label:"Music"},
    {value: 6, label:"Games"},
    {value: 7, label:"Autos & Vehicles"},
]


// 1.먼저 펑셔널 컴포넌트를 만든 뒤,
function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange =(e) =>{
        setCategory(e.currentTarget.value)
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
                        onDrop
                        multiple
                        maxSize>
                            {({getRootProps, getInputProps})=>(
                            <div style={{width:'300px', height:'240px',border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'}}{...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined style={{fontSize:'3rem'}} />

                            </div>
                        )}

                        </Dropzone>

                        {/* Thumnail */}
                        <div>
                            <img src alt />
                        </div>
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
