import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function TodoItem({ todo, allTodos, dispatchToggleTodo, dispatchDeleteTodo }) {

    const [index, setIndex] = useState(null)

    useEffect(() => {
        const getIndexTodo = () => {
            for (let i in allTodos) {
                if (allTodos[i].id === todo.id)
                    return i
            }
        }
        setIndex(getIndexTodo())
    }, [todo, allTodos])

    return (
        <li className='todos-item'>
            <div>
                <input
                    className='todos-item__input'
                    id={todo.id}
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => dispatchToggleTodo(index, todo.id)}
                />
                <label htmlFor={todo.id} className="todos-item__check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <p
                className='todos-item__text'
            >{todo.name}
            </p>
            <IconButton
                component="span"
                color='error'
                size='large'
                onClick={() => dispatchDeleteTodo(index, todo.id)}
            >
                <DeleteOutlineOutlinedIcon
                />
            </IconButton>
        </li>
    )
}
