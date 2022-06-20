import api from '../../config/api.config';
import { SET_ERROR } from './errors.actions';

export const RESET_TODOS = 'RESET_TODOS'
export const SET_TODOS = 'SET_TODOS'
export const CREATE_TODO = 'CREATE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_FILTER = 'SET_FILTER'

export const visibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_DONE: 'SHOW_DONE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const resetTodos = () => {
    return {
        type: RESET_TODOS,
        payload: ''
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
            const newTodo = await api.post(`todo`, { name: todo });
            dispatch(createTodoSucess(newTodo.data));
        } catch (err) {
            dispatch(createTodoError())
        }
    }
}

export const createTodoSucess = (newTodo) => {
    return {
        type: CREATE_TODO,
        payload: newTodo
    }
}

export const createTodoError = (err) => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de l\'ajout de la tâche'
        }
    }
}

export const toggleTodo = (index, todoId) => {
    return async (dispatch) => {
        try {
            await api.put(`todo/toggle-done/${todoId}`);
            dispatch(toggleTodoSuccess(index));
        } catch (err) {
            dispatch(toggleTodoError())
        }
    }
}

export const toggleTodoSuccess = (index) => {
    return {
        type: TOGGLE_TODO,
        payload: index
    }
}

export const toggleTodoError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la modification d\'état de la tâche'
        }
    }
}

export const deleteTodo = (index, todoId) => {
    return async (dispatch) => {
        try {
            await api.delete(`todo/${todoId}`);
            dispatch(deleteTodoSuccess(index))
        } catch (err) {
            dispatch(deleteTodoError())
        }
    }
}

export const deleteTodoSuccess = (index) => {
    return {
        type: DELETE_TODO,
        payload: index
    }
}

export const deleteTodoError = () => {
    return {
        type: SET_ERROR,
        payload: {
            title: 'Erreur du serveur',
            message: 'Echec de la supression de la tâche'
        }
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        payload: filter
    }
}