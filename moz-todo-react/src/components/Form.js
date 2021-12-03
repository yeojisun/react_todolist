import React, { useState, useEffect } from 'react';

function Form(props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
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
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input-title" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
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
        </form>
    );
}
export default Form;