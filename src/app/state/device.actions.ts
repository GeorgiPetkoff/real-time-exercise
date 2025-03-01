import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device';

// Decribe all actions which are dispatched by component
export const addDevice = createAction(
  '[Device Page] Add Device',
  props<{ device: Device }>()
);
export const addDeviceSuccess = createAction(
  '[Device API] Add Device Success',
  props<{ device: Device }>()
);

export const addDeviceFailure = createAction(
  '[Device API] Add Device Failure',
  props<{ error: string }>()
);

export const removeDevice = createAction(
  '[Device Page] Remove Device',
  props<{ id: string }>()
);

export const editDevice = createAction(
  '[Device Page] Edit Device',
  props<{ device: Device }>()
);

export const loadDevices = createAction('[Device Page] Load Device');

export const loadDevicesSuccess = createAction(
  '[Device API] Device Load Success',
  props<{ devices: Device[] }>()
);

export const loadDevicesFailure = createAction(
  '[Device API] Device Load Failure',
  props<{ error: string }>()
);