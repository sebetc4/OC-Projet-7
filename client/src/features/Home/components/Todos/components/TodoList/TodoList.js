import React from 'react'
import { TodoItem } from './components'

export default function TodoList({ todoList, dispatchToggleTodo, dispatchDeleteTodo }) {


  return (
    <ul className="list-group">
      {todoList.lenght !== 0 && todoList.map((todo, index) =>
        <TodoItem
          key={index + todo.name}
          todo={todo}
          index={index}
          dispatchToggleTodo={dispatchToggleTodo}
          dispatchDeleteTodo={dispatchDeleteTodo}
        />)
      }
    </ul>
  )
}
