import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, form } from 'antd';
import FloatLabel from './FloatLabel';

function Form(props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const { TextArea } = Input;
    function handleChange(e) {
        if (e.target.id === 'input-title') setTitle(e.target.value);
        else if (e.target.id === 'input-comment') setComment(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(title, comment);

        setTitle('');
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit}>
<<<<<<< HEAD
			
      <form.Item
        label="제목"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title!',
          },
        ]}
      >
                <FloatLabel label="제목" name="title">
                    <Input
						id="input-title"
                        style={{ padding: '16px 12px 4px 11px' }}
						value={title}
						onChange={handleChange}
                    />
                </FloatLabel>
			</form.Item>
      <form.Item
        label="내용"
        name="comment"
        rules={[
          {
            required: true,
            message: 'Please input comment!',
          },
        ]}
      >
                <FloatLabel label="내용" name="comment">
                    <TextArea
						id="input-comment"
                        style={{ padding: '16px 12px 4px 11px' }}
						value={comment}
						onChange={handleChange}
                    />
                </FloatLabel>
			</form.Item>
      <form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          추가하기
        </Button>
      </form.Item>
=======
            <input
                type="text"
                id="new-todo-input-title"
                className="input input_title__lg"
                name="text"
                autoComplete="off"
                value={title}
                onChange={handleChange}
            />
            <input
                type="text"
                id="new-todo-input-comment"
                className="input input_comment__lg"
                name="text"
                autoComplete="off"
                value={comment}
                onChange={handleChange}
            />
            <button type="submit" id="test" className="btn btn__primary btn__lg">
                Add
            </button>
>>>>>>> dcb0e99731fc8de45357e8daad82c4df87654d3c
        </form>
    );
}
export default Form;