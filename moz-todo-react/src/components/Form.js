import React, { useState } from 'react';

function Form(props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    function handleChange(e) {
		if(e.target.id === "new-todo-input-title")
        	setTitle(e.target.value);
		else if(e.target.id === "new-todo-input-comment")
        	setComment(e.target.value);
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
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}
export default Form;