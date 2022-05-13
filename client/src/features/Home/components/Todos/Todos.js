import React, { useEffect, useState } from 'react'
import { AddTodo, Filter, TodoList } from './components'
import { createTodo, toggleTodo, deleteTodo, setFilter, visibilityFilters } from '../../../../store/actions/todos.actions';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";

export default function Todo() {

  // Hooks
  const dispatch = useDispatch();

  // State
  const [todoList, setTodoList] = useState([])

  // Store
  const allTodos = useSelector(state => state.todos.data)
  const filter = useSelector(state => state.todos.filter)
  const dispatchCreateTodo = (todo) => dispatch(createTodo(todo))
  const dispatchSetFilter = (filter) => dispatch(setFilter(filter))
  const dispatchToggleTodo = (index, todoId) => dispatch(toggleTodo(index, todoId))
  const dispatchDeleteTodo = (index, todoId) => dispatch(deleteTodo(index, todoId))

  useEffect(() => {
    switch (filter) {
      case visibilityFilters.SHOW_DONE: {
        setTodoList(allTodos.filter(todo => todo.done))
        break;
      }
      case visibilityFilters.SHOW_ACTIVE: {
        setTodoList(allTodos.filter(todo => !todo.done))
        break;
      }
      default: {
        setTodoList(allTodos)
        break;
      }
    }
  }, [allTodos, filter])

  return (
    <div className="container p-5">
      <h4>Ajouter une todo</h4>
      <hr className="my-4" />
      <AddTodo
        dispatchCreateTodo={dispatchCreateTodo}
      />
      <hr className="my-4" />
      <div className="card">
        <div className="card-header d-flex flex-row align-items-center">
          <span className="flex-fill">Todo list</span>
          <Filter 
          dispatchSetFilter={dispatchSetFilter}
          />
        </div>
        <div className="card-body">
          <TodoList
            todoList={todoList}
            dispatchToggleTodo={dispatchToggleTodo}
            dispatchDeleteTodo={dispatchDeleteTodo}
          />
        </div>
      </div>
    </div>
  )
}

