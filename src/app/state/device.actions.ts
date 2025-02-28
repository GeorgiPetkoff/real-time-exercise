import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device';

export const addDevice = createAction(
  '[Device Page] Add Device',
  props<{ content: string }>()
);

export const removeTodo = createAction(
  '[Device Page] Remove Device',
  props<{ id: string }>()
);

export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Device[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo API] Todo Load Failure',
  props<{ error: string }>()
);