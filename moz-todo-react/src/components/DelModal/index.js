import React, { useState, useEffect } from 'react';
import Styled from './Styled';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

function DelModal(props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const delOk = () => {
        //setLoading(true);

        props.delTask(props.no);
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
        }
    }, [props.visible]);
    const delCancel = () => {
        setVisible(!visible);
        props.toggleFilter();
    };

    return (
        <Styled>
            <Modal
                visible={visible}
                onOk={delOk}
                onCancel={delCancel}
                footer={[
                    <Button key="back" onClick={delCancel}>
                        아뇨!
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={delOk}>
                        삭제가보자고!
                    </Button>,
                ]}
            >
                삭제하시겠습니까?
            </Modal>
        </Styled>
    );
}

export default DelModal;