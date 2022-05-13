import { CREATE_TODO, DELETE_TODO, GET_TODOS, SET_FILTER, TOGGLE_TODO } from "../actions/todos.actions";

const todosDefaultState = {
    data: [],
    filter: 'SHOW_ALL',
}

export default function todosReducer(state = todosDefaultState, action) {
    switch (action.type) {
        case GET_TODOS: {
            const todos = action.payload
            return {
                ...state,
                data: todos
            }
        }
        case CREATE_TODO: {
            const newTodo = action.payload
            return {
                ...state,
                data: [...state.data, newTodo]
            }
        }
        case DELETE_TODO: {
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
        case TOGGLE_TODO: {
            const index = action.payload
            const data = [...state.data]
            data[index].done = !data[index].done
            return {
                ...state,
                data
            }
        }
        default:
            return state;
    }
}