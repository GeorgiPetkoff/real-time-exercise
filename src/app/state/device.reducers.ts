import { createReducer, on } from '@ngrx/store';
import { deviceState } from './device.selector';
import { addDevice, editDevice, loadDevices, loadDevicesFailure, loadDevicesSuccess, removeDevice } from './device.actions';
import { Device } from '../models/device';

export const initialState: deviceState = {
  devices: [],
  error: null,
  status: 'pending',
};

export const deviceReducer = createReducer(
  initialState,
  on(addDevice, (state, { device }) => ({
    ...state,
    devices: [...state.devices, new Device(device.id,device.name,device.model,device.serialNumber,device.ipAddress,device.location,device.status)],
  })),

  on(editDevice, (state, { device }) => ({
    ...state,
    devices: state.devices.map(d => d.id === device.id ? {...device} : d)
  })),

  on(removeDevice, (state, { id }) => ({
    ...state,
    devices: state.devices.filter((device) => device.id !== id),
  })),

  on(loadDevices, (state) => ({ ...state, status: 'loading' })),

  on(loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices: devices,
    error: null,
    status: 'success',
  })),

  on(loadDevicesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);