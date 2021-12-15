import React, { useState, useRef, useEffect } from 'react';
import AddForm from './components/AddForm';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';// 랜덤 아이디 생성
import Styled from './Styled';
import EditModal from './components/EditModal';
import DelModal from './components/DelModal';
import { List, Button, Checkbox, Input, Spin, message, Comment, Avatar } from 'antd';
import 'antd/dist/antd.css';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

async function callApi() {
    const response = await fetch('/getSchedular'); // express rest api의 해당 주소로 접근
    const body = await response.json(); // 해당 주소의 데이터를 json 화
    return body;
}

function App(props) {
    //const [tasks, setTasks] = useState(props.tasks);

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ title: '', comment: '', no: '' });
    const [filter, setFilter] = useState('All');
    const [no, setNo] = useState();
    const [visible, setVisible] = useState(false);
    const [d_visible, setD_visible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        callApi()
            .then((res) => setTasks(res.schedular))
            //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
            .catch((err) => console.log('this is error ' + err));
    }, []);

    const FILTER_MAP = {
        All: () => true,
        Active: (task) => !task.completed,
        Completed: (task) => task.completed,
    };
    const FILTER_NAMES = Object.keys(FILTER_MAP);
    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
    ));

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .sort((a, b) => (a.reg_date < b.reg_date ? 1 : -1)); //Array.prototype.filter()
    // .map((task) => (
    //     <Todo
    //         no={task.no}
    //         title={task.title}
    //         comment={task.comment}
    //         completed={task.completed}
    //         key={task.no}
    //         toggleTaskCompleted={toggleTaskCompleted}
    //         deleteTask={deleteTask}
    //         editTask={editTask}
    //     />
    // ));
    const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} ...`;
    const listHeadingRef = useRef(null);

    function toggleTaskCompleted(no) {
        // task 업데이트 함수
        const updateTask = {
            no: no,
            completed: document.getElementById(no + 'chkbox').checked ? 1 : 0,
        };
        try {
            fetch('/updSchedular', {
                method: 'post', //통신방법
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(updateTask),
            }).then((res) => {
                res.json();

                callApi()
                    .then((res) => {
                        setTasks(res.schedular);
                    })
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
    }

    function addTask(title, comment) {
        const newTask = {
            id: nanoid(),
            title: title,
            comment: comment,
            completed: false,
        };
        try {
            fetch('/setSchedular', {
                method: 'post', //통신방법
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(newTask),
            }).then((res) => {
                res.json();
    			message.success('success!');

                callApi()
                    .then((res) => setTasks(res.schedular))
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
    }

    function editTask(title, comment, no) {
        const updateTask = { no: no, title: title, comment: comment };

        setLoading(true);

        try {
            fetch('/updSchedular', {
                method: 'post', //통신방법
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(updateTask),
            }).then((res) => {
                res.json();

                callApi()
                    .then((res) => {
                        setTasks(res.schedular);
                        setLoading(false);
                    })
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
    }

    function deleteTask(no) {
        //const remainingTasks = tasks.filter((task) => no !== task.no);
        //setTasks(remainingTasks);

        const deleteTask = { no: no };
        try {
            fetch('/delSchedular', {
                method: 'post', //통신방법
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(deleteTask),
            }).then((res) => {
                res.json();

                callApi()
                    .then((res) => setTasks(res.schedular))
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
    }

    function change_date(published_at) {
        // date 포맷 바꾸는 함수
        var moment = require('moment');

        const publish_date = moment(published_at).format('YYYY년 MM월 DD일 HH시');
        return publish_date;
    }

    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    function showModal(title, comment, no) {
        setTask({ title: title, comment: comment, no: no });
        setVisible(true);
        console.log('@@@수정버튼클릭시_' + visible);
    }

    function showDelModal(no) {
        setNo(no);
        setD_visible(true);
    }

    function toggleFilter() {
        setVisible(!visible);
        console.log('@@@닫기버튼클릭시');
    }
    function d_toggleFilter() {
        setD_visible(!d_visible);
    }
    return (
        <Styled>
            <Spin spinning={loading}>
                <div className="todoapp stack-large">
                    <AddForm addTask={addTask} />
                    <div className="filters btn-group stack-exception">{filterList}</div>
                    <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                        {headingText}
                    </h2>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={taskList}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="primary"
                                        onClick={() => showModal(item.title, item.comment, item.no)}
                                        disabled={item.completed}
                                    >
                                        Edit
                                    </Button>,
                                    <Button onClick={() => showDelModal(item.no)}>
                                        Remove
                                    </Button>,
                                ]}
                            >
								
                                <Checkbox
                                    id={item.no + 'chkbox'}
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleTaskCompleted(item.no)}
                                >
                                    <List.Item.Meta
                                        title={item.title}
                                        description={change_date(item.reg_date)}
                                        className={
                                            item.completed ? 'list_title_' + item.completed : ''
                                        }
                                    />
                                    {item.comment}
									
                                </Checkbox>
                            </List.Item>
                        )}
                    />
                </div>
                <DelModal
                    no={no}
                    visible={d_visible}
                    delTask={deleteTask}
                    toggleFilter={d_toggleFilter}
                ></DelModal>
                <EditModal
                    title={task.title}
                    comment={task.comment}
                    no={task.no}
                    visible={visible}
                    toggleFilter={toggleFilter}
                    editTask={editTask}
                ></EditModal>
            </Spin>
        </Styled>
        //<ul
        //        role="list"
        //        className="todo-list stack-large stack-exception"
        //       aria-labelledby="list-heading"
        //   >
        //   </ul>
    );
}

export default App; // 다른 모듈에서 App컴포넌트들을 사용할 수 있도록 하는 명령