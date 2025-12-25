export type Todo = {
    activity: string
    activityId: number
    status: 'completed' | 'removed' | 'pending'
}


export type TodoAppState =
    | {status: 'loading' | 'idle', filterStatus: 'idle', todosStatus: 'idle'}
    | {status: 'successful', filterStatus: 'filtered' | 'unfiltered', todosStatus: 'empty' | 'loaded'}
    | {status: 'error', filterStatus: 'idle', todosStatus: 'idle', errorMessage: string}