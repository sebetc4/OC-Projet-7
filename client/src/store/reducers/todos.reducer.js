import { CREATE_TODO_SUCCESS, DELETE_TODO_SUCCESS, SET_TODOS, SET_FILTER, TOGGLE_TODO_SUCCESS, RESET_TODOS, TODOS_ERROR } from "../actions/todos.actions";

const todosDefaultState = {
    data: [],
    filter: 'SHOW_ALL',
    error: null
}

export default function todosReducer(state = todosDefaultState, action) {
    switch (action.type) {
        case RESET_TODOS: {
            return todosDefaultState
        }
        case SET_TODOS: {
            const todos = action.payload
            return {
                ...state,
                data: todos
            }
        }
        case CREATE_TODO_SUCCESS: {
            const newTodo = action.payload
            return {
                ...state,
                data: [...state.data, newTodo]
            }
        }
        case DELETE_TODO_SUCCESS: {
            const index = action.payload
            const data = [...state.data]
            data.splice(index, 1)
            return {
                ...state,
                data
            }
        }
        case SET_FILTER: {
            const filter = action.payload
            return {
                ...state,
                filter
            }
        }
        case TOGGLE_TODO_SUCCESS: {
            const index = action.payload
            const data = [...state.data]
            data[index].done = !data[index].done
            return {
                ...state,
                data
            }
        }
        case TODOS_ERROR: {
            const error = action.playload
            return { ...state, error }
        }
        default: {
            return state;
        }
    }
}