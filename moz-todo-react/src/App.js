import React, { useState, useRef, useEffect } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';
import axios from 'axios';
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
    const [filter, setFilter] = useState('All');
    const [posts, setPosts] = useState([]);
    // useEffect(() => {
    // axios
    //   .get("/hello")
    //   .then(({schedular})=>setPosts(schedular));
    //   //.then(response => console.log(response));
    // });
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
        .filter(FILTER_MAP[filter]) //Array.prototype.filter()
        .map((task) => (
            <Todo
                no={task.no}
                title={task.title}
                comment={task.comment}
                completed={task.completed}
                key={task.no}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));
    const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    const listHeadingRef = useRef(null);

    function addTask(title, comment) {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        var dateString = year + '-' + month + '-' + day;
        //const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
        //const newTask = { id: "id", name: name, completed: false };
        const newTask = {
            id: nanoid(),
            title: title,
            comment: comment,
            completed: false,
            reg_date: dateString,
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

                callApi()
                    .then((res) => setTasks(res.schedular))
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
        // .then((json) => {
        //    console.log(json);

        //  });

        //setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(no) {
        // const updatedTasks = tasks.map((task) => {
        // // if this task has the same ID as the edited task
        // if (no === task.no) {
        // // use object spread to make a new object
        // // whose `completed` prop has been inverted
        // return { ...task, completed: !task.completed };
        // }
        // console.log(id);
        // console.log(task.id);
        // return task;
        // });
        // setTasks(updatedTasks);
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
                    .then((res) => setTasks(res.schedular))
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

    function editTask(title, comment, no) {
        // const editedTaskList = tasks.map((task) => {
        //     if (id === task.id) {
        //         return { ...task, name: newName };
        //     }
        //     return task;
        // });
        // setTasks(editedTaskList);

        const updateTask = { no: no, title: title, comment: comment };
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
                    .then((res) => setTasks(res.schedular))
                    //.then(res => console.log(res.schedular))           // useEffect를 통해 callApi 함수 실행
                    .catch((err) => console.log('this is error ' + err));
            });
        } catch (error) {
            console.log(error);
        }
    }

    const prevTaskLength = usePrevious(tasks.length);
    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
            <div className="todoapp stack-large">
                <h1>TodoMatic</h1>
                <Form addTask={addTask} />
                <div className="filters btn-group stack-exception">{filterList}</div>
                <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                    {headingText}
                </h2>
                <ul
                    role="list"
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading"
                >
                    {taskList}
                </ul>
            </div>
    );
}

export default App; // 다른 모듈에서 App컴포넌트들을 사용할 수 있도록 하는 명령