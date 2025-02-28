import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { deviceState } from './device.selector';
import { DeviceService } from '../services/device.service';
import { addDevice, addDeviceFailure, addDeviceSuccess, loadDevices, loadDevicesFailure, loadDevicesSuccess } from './device.actions';

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {}

  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDevices),
      switchMap(() => 
        from(this.deviceService.getAllDevices().pipe(
        map((devices) => loadDevicesSuccess({devices: devices})),
        catchError((error) => of(loadDevicesFailure(error)))
      )))
    )
  );

  saveDevice$ = createEffect(() => 
  this.actions$.pipe(
    ofType(addDevice),
    exhaustMap((device) => {
      return this.deviceService.saveDevice(device.device).pipe(
        map((data) => addDeviceSuccess({device: data})),
        catchError((error) => of(addDeviceFailure(error)))
      )
    })

  )
)
}