import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device } from '../models/device';

export interface deviceState {
  devices: Device[];
  error: string | null;
  status: string;
}
// selectors is used to retrieve state from the global state, in this case to get all devices from the store
export const selectDeviceFeature = createFeatureSelector<deviceState>('devices');

export const selectAllDevices = createSelector(
  selectDeviceFeature,
  (state) => state.devices
);