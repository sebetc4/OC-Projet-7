import axios from 'axios';

export const GET_TODOS = 'GET_TODOS'
export const CREATE_TODO = 'CREATE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE-TODO'
export const SET_FILTER = 'SET_FILTER'

export const visibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_DONE: 'SHOW_DONE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const getTodos = (todos) => {
    return {
        type: GET_TODOS,
        payload: todos
    }
}

export const createTodo = (todo) => {
    return async (dispatch) => {
        const newTodo = await axios.post(`/api/todo`, { name: todo });
        dispatch({
            type: CREATE_TODO,
            payload: newTodo.data
        });
    }
}

export const toggleTodo = (index, todoId) => {
    return async (dispatch) => {
        await axios.put(`/api/todo/toggle-done/${todoId}`);
        dispatch({
            type: TOGGLE_TODO,
            payload: index
        });
    }
}

export const deleteTodo = (index, todoId) => {
    return async (dispatch) => {
        await axios.delete(`/api/todo/${todoId}`);
        dispatch({
            type: DELETE_TODO,
            payload: index
        })
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        payload: filter
    }
}