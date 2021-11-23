import React, { useEffect, useRef, useState } from 'react';

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');
    const editTitleFieldRef = useRef(null);
    const editCommentFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    function handleTitleChange(e) {
		const commentVal = document.getElementById(e.target.id.replace("title","")+"comment").value;
        setNewComment(commentVal);
        setNewTitle(e.target.value);
    }
    function handleCommentChange(e) {
		const titleVal = document.getElementById(e.target.id.replace("comment","")+"title").value;
        setNewComment(e.target.value);
        setNewTitle(titleVal);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(newTitle, newComment, props.no);
        setNewTitle('');
		setNewComment('');
        setEditing(false);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.no}>
                    New name for {props.title}
                </label>
                <input
                    id={props.no + "title"}
                    className="todo-text"
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    ref={editTitleFieldRef}
                />
                <input
                    id={props.no + "comment"}
                    className="todo-text"
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    ref={editCommentFieldRef}
                />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.title}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.title}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.no + "title"}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.no)}
                />
                <label className="todo-label" htmlFor={props.no}>
                    {props.title}
                </label>
            </div>
            <div className="comment" htmlFor={props.no}>
                {props.comment}
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.title}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.no)}
                >
                    Delete <span className="visually-hidden">{props.title}</span>
                </button>
            </div>
        </div>
    );

    // 	useEffect(() => {
    //   console.log("side effect");
    // });
    useEffect(() => {
		if(isEditing){
            editTitleFieldRef.current.value = props.title;
            editCommentFieldRef.current.value = props.comment;
		}
        if (!wasEditing && isEditing) {
            editTitleFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

    // return (
    //     <li className="todo stack-small">
    //         <div className="c-cb">
    //             <input
    //                 id={props.id}
    //                 type="checkbox"
    //                 defaultChecked={props.completed}
    //                 onChange={() => props.toggleTaskCompleted(props.id)}
    //             />
    //             <label className="todo-label" htmlFor={props.id}>
    //                 {props.name}
    //             </label>
    //         </div>
    //         <div className="btn-group">
    //             <button type="button" className="btn">
    //                 Edit <span className="visually-hidden">{props.name}</span>
    //             </button>
    //             <button
    //                 type="button"
    //                 className="btn btn__danger"
    //                 onClick={() => props.deleteTask(props.id)}
    //             >
    //                 Delete <span className="visually-hidden">{props.name}</span>
    //             </button>
    //         </div>
    //     </li>
    // );
}