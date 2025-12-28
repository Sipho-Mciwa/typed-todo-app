import type { TodoAction } from "./actions";
import type { TodoAppState } from "./types";



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
                    return ({status: 'successful', filterStatus: 'unfiltered', todosStatus: 'loaded'});
                case "LOAD_TODOS_FAILED":
                    return ({status: 'error', filterStatus: 'idle', todosStatus: 'idle', message: action.errorMessage});
                default:
                    return (state);
            }
        }

        case "successful": {
            switch (action.type) {
                case "TODO_ADDED":
                    console.log('here?')
                    return ({status: 'successful', filterStatus: 'unfiltered', todosStatus: 'loaded'});
                case "TODO_REMOVED":
                    return ({status: 'successful', filterStatus: 'unfiltered', todosStatus: 'empty'});
                case "TODO_TOGGLED":
                    return ({status: 'successful', filterStatus: 'unfiltered', todosStatus: 'loaded'});
                case "FILTER_CHANGED":
                    return ({status: 'successful', filterStatus: 'filtered', todosStatus: 'loaded'});
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