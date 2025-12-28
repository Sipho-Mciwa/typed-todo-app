import { describe, it, expect } from 'vitest';
import { reducer } from '../reducer';
import type { TodoAction } from '../actions';
import type { SuccessfulOverrieds, TodoAppState } from '../types';

const mockTodo = {activity: 'Testing', activityId: 1, status: 'pending'};

const idleState = (): TodoAppState => ({
    status: 'idle',
    filterStatus: 'idle',
    todosStatus: 'idle'
});

const loadingState = (): TodoAppState => ({
    status: 'loading',
    filterStatus: 'idle',
    todosStatus: 'idle'
});

const successfulState = (overrides?: SuccessfulOverrieds): Extract<TodoAppState, {status: 'successful'}> => ({
    status: 'successful',
    filterStatus: 'unfiltered',
    todosStatus: 'loaded',
    ...overrides
});

const errorState = (message = 'error'): TodoAppState => ({
    status: 'error',
    filterStatus: 'idle',
    todosStatus: 'idle',
    message
});

describe('Todo reducer', () => {
    describe('idle state', () => {
        it('moves to loading when LOAD_TODOS_REQUESTED is dispatched', () => {
            const state = idleState();
            const action: TodoAction = {type: 'LOAD_TODOS_REQUESTED'};

            const next = reducer(state, action);

            expect(next).toEqual(loadingState());
        });
    });

    describe('loading state', () => {
        it ('moves to successful when LOAD_TODOS_SUCCEEDED is dispatched', () => {
            const state = loadingState();
            const action: TodoAction = {
                type: 'LOAD_TODOS_SUCCEEDED',
                todos: [mockTodo]
            };

            const next = reducer(state, action);

            expect(next.status).toBe('successful');
            expect(next.todosStatus).toBe('loaded');
        });

        it('moves to error when LOAD_TODOS_FAILED is dispatched', () => {
            const state = loadingState();
            const action: TodoAction = {
                type: 'LOAD_TODOS_FAILED',
                errorMessage: 'network error'
            };

            const next = reducer(state, action);

            expect(next).toEqual(errorState('network error'));
        });

        it('ignores TODO actions while loading', () => {
            const state = loadingState();
            const action: TodoAction = { type: 'TODO_REMOVED', todoId: 1 };

            const next = reducer(state, action);

            expect(next).toBe(state);
        });
    });

    describe('successful state', () => {
        it('loads todos when TODO_ADDED is dispatched', () => {
            const state = successfulState({ todosStatus: 'empty' });
            const action: TodoAction = { type: 'TODO_ADDED', todo: mockTodo };

            const next = reducer(state, action);

            expect(next.todosStatus).toBe('loaded');
            expect(next.status).toBe('successful');
        });

        it('empties todos when TODO_REMOVED is dispatched', () => {
            const state = successfulState();
            const action: TodoAction = { type: 'TODO_REMOVED', todoId: 1 };

            const next = reducer(state, action);

            expect(next.todosStatus).toBe('empty');
        });

        it('applies filter when FILTER_CHANGED is dispatched', () => {
            const state = successfulState();
            const action: TodoAction = {
            type: 'FILTER_CHANGED',
            filter: 'completed'
            };

            const next = reducer(state, action);

            expect(next.filterStatus).toBe('filtered');
        });
    });


    describe('error state', () => {
        it('allows retry by moving to loading', () => {
            const state = errorState('boom');
            const action: TodoAction = { type: 'LOAD_TODOS_REQUESTED' };

            const next = reducer(state, action);

            expect(next).toEqual(loadingState());
        });

        it('ignores todo actions', () => {
            const state = errorState();
            const action: TodoAction = { type: 'TODO_ADDED', todo: mockTodo };

            const next = reducer(state, action);

            expect(next).toBe(state);
        });
    });
});