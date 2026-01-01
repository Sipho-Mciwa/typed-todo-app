import type { TodoAction } from "./actions";
import type { TodoAppState, Todo } from "./types";




export function reducer(state: TodoAppState, action: TodoAction): TodoAppState {
    switch (state.status) {
        case "idle":{
            switch (action.type) {
                case "LOAD_TODOS_REQUESTED":
                    return ({status: 'loading', filterStatus: 'idle', todosStatus: 'idle'});
                default:
                    return (state);
            }
        }

        case "loading": {
            switch (action.type) {
                case "LOAD_TODOS_SUCCEEDED":
                    return ({status: 'successful', filterStatus: 'unfiltered', todosStatus: action.todos.length === 0 ? 'empty' : 'loaded', todos: action.todos});
                case "LOAD_TODOS_FAILED":
                    return ({status: 'error', filterStatus: 'idle', todosStatus: 'idle', message: action.errorMessage});
                default:
                    return (state);
            }
        }

        case "successful": {
            switch (action.type) {
                case "TODO_ADDED": { 
                        const newTodos = [...state.todos, action.todo];
                        return ({...state, todosStatus: newTodos.length !== 0 ? 'loaded' : 'empty',  todos: newTodos}); 
                    }
                case "TODO_REMOVED": {
                        const newTodos = state.todos.filter((todo) => todo.activityId !== action.todoId);
                        return ({...state, todosStatus: newTodos.length !== 0 ? 'loaded' : 'empty', todos: newTodos})
                    }
                case "TODO_TOGGLED": {
                        const newTodos = state.todos.map((todo): Todo => todo.activityId === action.todoId ? {...todo, status: 'completed'} : todo);
                        return ({...state, todos: newTodos})
                    }
                case "FILTER_CHANGED":{
                        return ({...state, filterStatus: action.filter === 'all' ? 'unfiltered' : 'filtered'});
                    }
                default:
                    return (state);
            }
        }

        case "error": {
            switch (action.type) {
                case "LOAD_TODOS_REQUESTED":
                    return ({status: 'loading', filterStatus: 'idle', todosStatus: 'idle'});
                default:
                    return (state);
            }
        }

        default: {
            const _exhaustive: never = state;
            return (_exhaustive);
        }

    }
}