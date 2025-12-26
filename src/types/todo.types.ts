export type Todo = {
    activity: string
    activityId: number
    status: 'completed' | 'removed' | 'pending'
}


export type TodoAppState =
    | {status: 'idle', filterStatus: 'idle', todosStatus: 'idle'}
    | {status: 'loading', filterStatus: 'idle', todosStatus: 'idle'}
    | {status: 'successful', filterStatus: 'filtered' | 'unfiltered', todosStatus: 'empty' | 'loaded'}
    | {status: 'error', filterStatus: 'idle', todosStatus: 'idle', message: string}
