import axios from 'axios';

export const RESET_TODOS = 'RESET_TODOS'

export const SET_TODOS = 'SET_TODOS'

export const CREATE_TODO = 'CREATE_TODO'
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS'

export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

export const SET_FILTER = 'SET_FILTER'

export const TODOS_ERROR = 'TODOS_ERROR'


export const visibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_DONE: 'SHOW_DONE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const resetTodos = () => {
    return {
        type: RESET_TODOS,
        playload: ''
    }
}

export const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        payload: todos
    }
}

export const createTodo = (todo) => {
    return async (dispatch) => {
        try {
            const newTodo = await axios.post(`/api/todo`, { name: todo });
            dispatch(createTodoSucess(newTodo.data));
        } catch {
            dispatch(createTodoError())
        }
    }
}

export const createTodoSucess = (todos) => {
    return {
        type: CREATE_TODO_SUCCESS,
        payload: todos
    }
}

export const createTodoError = () => {
    return {
        type: TODOS_ERROR,
        playload: 'Echec lors de l\'ajout de la tâche'
    }
}

export const toggleTodo = (index, todoId) => {
    return async (dispatch) => {
        try {
            await axios.put(`/api/todo/toggle-done/${todoId}`);
            dispatch(toggleTodoSuccess(index));
        } catch {
            dispatch(toggleTodoError())
        }
    }
}

export const toggleTodoSuccess = (index) => {
    return {
        type: TOGGLE_TODO_SUCCESS,
        payload: index
    }
}

export const toggleTodoError = () => {
    return {
        type: TODOS_ERROR,
        playload: 'Echec lors de la modification d\'état de la tâche'
    }
}

export const deleteTodo = (index, todoId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/todo/${todoId}`);
            dispatch(deleteTodoSuccess(index))
        } catch {
            dispatch(deleteTodoError())
        }
    }
}

export const deleteTodoSuccess = (index) => {
    return {
        type: DELETE_TODO_SUCCESS,
        payload: index
    }
}

export const deleteTodoError = () => {
    return {
        type: TODOS_ERROR,
        playload: 'Echec lors de la supression de la tâche'
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        payload: filter
    }
}