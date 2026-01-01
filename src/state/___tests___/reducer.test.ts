import { describe, it, expect } from 'vitest';
import { reducer } from '../reducer';
import type { TodoAction } from '../actions';
import type {  Todo, TodoAppState } from '../types';

const todo = (overrides?: Partial<Todo>): Todo => ({
    activity: 'Test',
    activityId: 1,
    status: 'pending',
    ...overrides,
});

const idleState = (): TodoAppState => ({
    status: 'idle',
    filterStatus: 'idle',
    todosStatus: 'idle',
});

const loadingState = (): TodoAppState => ({
    status: 'loading',
    filterStatus: 'idle',
    todosStatus: 'idle'
});

const successfulState = (todos: Todo[] = []): TodoAppState => ({
    status: 'successful',
    filterStatus: 'unfiltered',
    todosStatus: todos.length === 0 ? 'empty' : 'loaded',
    todos
})

const errorState = (message = 'error'): TodoAppState => ({
    status: 'error',
    filterStatus: 'idle',
    todosStatus: 'idle',
    message
});

describe('Todo reducer', () => {
    describe('idle state', () => {
        it('moves to loading on LOAD_TODOS_REQUESTED', () => {
            const next = reducer(idleState(), {type: 'LOAD_TODOS_REQUESTED'});

            expect(next).toEqual(loadingState());
        });

        it('ignores unrelated actions', () => {
            const state = idleState();
            const next = reducer(state, {type: 'TODO_ADDED', todo: todo()});

            expect(next).toBe(state); // identity check
        });
    });

    describe('loading state', () => {
        it ('moves to successful on LOAD_TODOS_SUCCEEDED (non-empty)', () => {
            const state = loadingState();
            const todos = [todo()]
            const next = reducer(state, {type: 'LOAD_TODOS_SUCCEEDED', todos: todos});

            expect(next).toEqual(successfulState(todos));
        });

        it ('moves to successful with empty todos', () => {
            const next = reducer(loadingState(), {type: 'LOAD_TODOS_SUCCEEDED', todos: []});
            expect(next).toEqual(successfulState([]));
        });

        it('moves to error when LOAD_TODOS_FAILED is dispatched', () => {
            const next = reducer(loadingState(), {type: 'LOAD_TODOS_FAILED', errorMessage: 'failed'});
            expect(next).toEqual(errorState('failed'));
        });

        
    });

    describe('successful state', () => {
        it('adds a todo', () => {
            const initial = successfulState([]);
            const newTodo = todo({activityId: 2});
            const next = reducer(initial, {type: 'TODO_ADDED', todo: newTodo});

            if (next.status !== 'successful') throw new Error('Expected successful state');
            if (initial.status !== 'successful') throw new Error('Expected successful state');

            expect(next.todos).toHaveLength(1);
            expect(next.todos).not.toBe(initial.todos);
            expect(next.todos[0]).toEqual(newTodo);
            expect(next.todosStatus).toBe('loaded');
        });

        it('removes a todo by id', () => {
            const state = successfulState([todo(), todo({ activityId: 2 })]);
            const next = reducer(state, { type: 'TODO_REMOVED', todoId: 1 });

            expect(next.todos).toHaveLength(1);
            expect(next.todos[0].activityId).toBe(2);
        });

        it('does nothing if todoId does not exist', () => {
            const initial = successfulState([todo()]);
            const next = reducer(initial, { type: 'TODO_REMOVED',todoId: 999 });

            expect(next).toEqual(initial);
        });

        it('sets filterStatus correctly', () => {
            const state = successfulState([todo()]);
            const next = reducer(state, { type: 'FILTER_CHANGED', filter: 'completed' });

            expect(next.filterStatus).toBe('filtered');
        });
    });

    describe('error state', () => {
        it('moves back to loading on LOAD_TODOS_REQUESTED', () => {
            const state = errorState('boom');
            const action: TodoAction = { type: 'LOAD_TODOS_REQUESTED' };
            const next = reducer(state, action);

            expect(next).toEqual(loadingState());
        });

        it('ignores other actions', () => {
            const state = errorState();
            const action: TodoAction = { type: 'TODO_ADDED', todo: todo() };

            const next = reducer(state, action);

            expect(next).toBe(state);
        });
    });
});