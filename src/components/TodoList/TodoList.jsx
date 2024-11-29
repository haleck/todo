import React, {memo, useEffect, useRef} from 'react';
import TodoItem from "../TodoItem/TodoItem.jsx";
import classes from "./TodoList.module.css"

const TodoList = memo(({todos}) => {
    const listRef = useRef(null);

    useEffect(() => {
        const listElement = listRef.current;
        const hasScrollbar = listElement.scrollHeight > listElement.clientHeight;

        if (hasScrollbar) {
            listElement.style.paddingRight = '10px';
        } else {
            listElement.style.paddingRight = '0';
        }
    }, [todos]);

    return (
        <div ref={listRef} className={classes.todoList}>
            {todos.map((todo) =>
                <TodoItem
                    key={todo.id}
                    todo={todo}
                />
            )}
        </div>
    );
});

export default TodoList;