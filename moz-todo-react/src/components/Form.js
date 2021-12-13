import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import FloatLabel from './FloatLabel';

function Form(props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const { TextArea } = Input;
    // useEffect(() => {
    //  var test = document.getElementById('test');
    //  if()
    // test.style.visibility = 'hidden';
    // console.log('컴포넌트가 화면에 나타남'+test);
    // return () => {
    //   console.log('컴포넌트가 화면에서 사라짐');
    // };
    // }, []);
    function handleChange(e) {
        if (e.target.id === 'new-todo-input-title') setTitle(e.target.value);
        else if (e.target.id === 'new-todo-input-comment') setComment(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(title, comment);

        setTitle('');
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit}>
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
			
                <FloatLabel label="제목" name="title">
                    <Input
                        style={{ padding: '16px 12px 4px 11px' }}
                    />
                </FloatLabel>
                <br />
                <FloatLabel label="내용" name="comment">
                    <TextArea
                        style={{ padding: '16px 12px 4px 11px' }}
                    />
                </FloatLabel>
            <button type="submit" id="test" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}
export default Form;