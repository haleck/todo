import React, {useState} from 'react';
import classes from "./MainPage.module.css";
import TodoList from "../../components/TodoList/TodoList.jsx";
import TodoCreator from "../../components/TodoCreator/TodoCreator.jsx";

const PinSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" {...props}>
        <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/>
    </svg>
)

const MainPage = () => {
    const [todos, setTodos] = useState([
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
    ])

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <span>ToDo App</span>
                    <PinSvg style={{width: 35, height: 35}} />
                </div>
                <TodoCreator
                    todos={todos}
                    setTodos={setTodos}
                />
                <TodoList todos={todos}/>
            </div>
        </div>
    );
};

export default MainPage;