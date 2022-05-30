import React, { useEffect, useState } from 'react'
import { AddTodo, Filter, TodoList } from './components'
import { createTodo, toggleTodo, deleteTodo, setFilter, visibilityFilters } from '../../../../store/actions/todos.actions';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { Divider } from '@mui/material';

export default function Todo() {

  // Hooks
  const dispatch = useDispatch();

  // Store
  const allTodos = useSelector(state => state.todos.data)
  const filter = useSelector(state => state.todos.filter)

  // State
  const [todoList, setTodoList] = useState([])

  // Dispatch
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
    <div className="home-todos">
      <h2 className='home-todos__title'>Vos tâches</h2>
      <Filter
        filter={filter}
        dispatchSetFilter={dispatchSetFilter}
      />
      <Divider />
      <TodoList
        todoList={todoList}
        allTodos={allTodos}
        filter={filter}
        dispatchToggleTodo={dispatchToggleTodo}
        dispatchDeleteTodo={dispatchDeleteTodo}
      />
      <Divider />
      <AddTodo
        dispatchCreateTodo={dispatchCreateTodo}
      />
    </div>
  )
}

