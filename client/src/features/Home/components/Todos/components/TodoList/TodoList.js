import { Divider } from '@mui/material'
import React from 'react'
import { TodoItem } from './components'

export default function TodoList({ todoList, allTodos, filter, dispatchToggleTodo, dispatchDeleteTodo }) {

  return (
    <>
      <ul>
        {todoList.lenght !== 0 && todoList.map((todo, index) => (
          <div
            key={index + todo.name}
          >
            <TodoItem
              todo={todo}
              allTodos={allTodos}
              dispatchToggleTodo={dispatchToggleTodo}
              dispatchDeleteTodo={dispatchDeleteTodo}
            />
            {
              todoList.lenght !== index + 1 && <Divider />
            }
          </div>
        )
        )}
      </ul>
      {
        (todoList.length === 0 && filter === 'SHOW_ALL') &&
        <p className='todos-list__no-todo-text'>Aucune tâche</p>
      }
      {
        (todoList.length === 0 && filter === 'SHOW_DONE') &&
        <p className='todos-list__no-todo-text' >Aucune tâche finie</p>
      }
      {
        (todoList.length === 0 && filter === 'SHOW_ACTIVE') &&
        <p className='todos-list__no-todo-text' >Aucune tâche en cours</p>
      }
    </>
  )
}
