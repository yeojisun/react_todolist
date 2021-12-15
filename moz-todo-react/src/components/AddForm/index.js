import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import FloatLabel from '../FloatLabel';

function AddForm(props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const { TextArea } = Input;
    function handleChange(e) {
        if (e.target.id === 'input-title') setTitle(e.target.value);
        else if (e.target.id === 'input-comment') setComment(e.target.value);
    }

    function handleSubmit(e) {
        props.addTask(title, comment);

        setTitle('');
        setComment('');
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input title!',
                    },
                ]} 
            >
                <Input
                    id="input-title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item
                label="Comment"
                name="comment"
                rules={[
                    {
                        required: true,
                        message: 'Please input comment!',
                    },
                ]}
            >
                <TextArea
                    id="input-comment"
                    value={comment}
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item
            >
                <Button type="primary" htmlType="submit" block>Add</Button>
            </Form.Item>
        </Form>
    );
}
export default AddForm;