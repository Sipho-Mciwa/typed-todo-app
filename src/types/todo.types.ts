export type Todo = {
    activity: string
    activityId: number
    status: 'completed' | 'removed' | 'pending'
}


export type TodoAppState =
    | {appState: 'loading' | 'idle', filterState: 'idle', todosState: 'idle'}
    | {appState: 'successful', filterState: 'filtered' | 'unfiltered', todosState: 'empty' | 'loaded'}
    | {appState: 'error', filterState: 'idle', todosState: 'idle', errorMessage: string}