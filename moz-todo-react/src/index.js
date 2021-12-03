import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { BrowserRouter } from 'react-router-dom'; //추가할 부분
import { Route, Routes } from 'react-router-dom';

import App from './App';
import Test from './components/Test';
import reportWebVitals from './reportWebVitals';
import './index.css'

// const DATA = [
//   { id: "todo-0", name: "Eat", completed: true },
//   { id: "todo-1", name: "Sleep", completed: false },
//   { id: "todo-2", name: "Repeat", completed: false }
// ];
// ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();