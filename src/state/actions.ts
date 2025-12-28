import type { Todo } from "./types/todo.types";

export type TodoAction =
  | { type: 'LOAD_TODOS_REQUESTED' }
  | { type: 'LOAD_TODOS_SUCCEEDED'; todos: Todo[] }
  | { type: 'LOAD_TODOS_FAILED'; errorMessage: string }
  | { type: 'TODO_ADDED'; todo: Todo }
  | { type: 'TODO_REMOVED'; todoId: number }
  | { type: 'TODO_TOGGLED'; todoId: number }
  | { type: 'FILTER_CHANGED'; filter: 'all' | 'completed' | 'pending' };

