import React from 'react'
import { useDispatch } from "react-redux";
import { deleteTodo } from '../../../../../../../../store/actions/todos.actions';



export default function TodoItem({ todo, index, dispatchToggleTodo, dispatchDeleteTodo }) {

    return (
        <li className='' >
            <span>{todo.name}</span>
            <span>
                <input 
                    className='' 
                    type="checkbox"
                    checked={todo.done} 
                    onChange={() => dispatchToggleTodo(index, todo.id)}
                    />
                <button
                    className=''
                    onClick={() => dispatchDeleteTodo(index, todo.id)}
                >
                    Delete
                </button>
            </span>
        </li>
    )
}
