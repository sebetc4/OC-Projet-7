import { Divider } from '@mui/material'
import React from 'react'
import { TodoItem } from './components'

export default function TodoList({ todoList, allTodos, dispatchToggleTodo, dispatchDeleteTodo }) {

  return (
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
  )
}
