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

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
	const [posts, setPosts] = useState([]);
	  useEffect(() => {
		axios
		  .get("/hello")
		  //.then(({data})=>setPosts(data));
		  .then(response => console.log(response));
	  });
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
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));
    const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    const listHeadingRef = useRef(null);

    function addTask(name) {
        const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
        //const newTask = { id: "id", name: name, completed: false };
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTaskList);
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