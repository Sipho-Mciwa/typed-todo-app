export type Todo = {
    activity: string
    activityId: number
    status: 'completed' | 'removed' | 'pending'
}

export type TodoAppState = {
    appState: 'loading' | 'successful' | 'error' | 'idle'
    filterState: 'filtered' | 'unfiltered' | 'idle'
    todosState: 'empty' | 'loaded' | 'idle'
}