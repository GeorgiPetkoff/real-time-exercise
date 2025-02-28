import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device } from '../models/device';

export interface deviceState {
  devices: Device[];
  error: string | null;
  status: string;
}

export const selectDeviceFeature = createFeatureSelector<deviceState>('devices');

export const selectAllDevices = createSelector(
  selectDeviceFeature,
  (state) => state.devices
);