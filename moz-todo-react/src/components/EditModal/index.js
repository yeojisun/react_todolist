import React, { useState, useEffect, useRef } from 'react';
import Styled from './Styled';
import FloatLabel from '../FloatLabel';
import { Button, Modal, Input } from 'antd';
import 'antd/dist/antd.css';

function EditModal(props) {
    const { title, comment } = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { TextArea } = Input;
	
    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');

    function handleTitleChange(e) {
        setNewComment(newComment);
        setNewTitle(e.target.value);
    }
    function handleCommentChange(e) {
        setNewComment(e.target.value);
        setNewTitle(newTitle);
    }
	
    const editOk = () => {
        //setLoading(true);

        props.editTask(newTitle, newComment, props.no);
        setNewTitle('');
        setNewComment('');
        setVisible(!visible);
        props.toggleFilter();
		// setTimeout(() => {
        //     setVisible(false);
        //     setLoading(false);
        // }, 3000);
    };

    useEffect(() => {
        console.log('@@@editmodal업데이트_' + props.visible);
        if (props.visible) {
            setVisible(!visible);
			setNewTitle(props.title);
			setNewComment(props.comment);
        }
    }, [props.visible]);
    const editCancel = () => {
        setVisible(!visible);
        props.toggleFilter();
    };

    return (
        <Styled>
            <Modal
                visible={visible}
                title="Edit Modal"
                onOk={editOk}
                onCancel={editCancel}
                footer={[
                    <Button key="back" onClick={editCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={editOk}>
                        Edit
                    </Button>,
                ]}
            >
                <FloatLabel label="Title" name="title" value={newTitle}>
                    <Input
                        style={{ padding: '16px 12px 4px 11px' }}
						value={newTitle}
						onChange={handleTitleChange}
                    />
                </FloatLabel>
                <br />
                <FloatLabel label="Comment" name="comment" value={newComment}>
                    <TextArea
                        style={{ padding: '16px 12px 4px 11px' }}
						value={newComment}
						onChange={handleCommentChange}
                    />
                </FloatLabel>
            </Modal>
        </Styled>
    );
}

export default EditModal;