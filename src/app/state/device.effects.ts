import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { DeviceService } from '../services/device.service';
import { addDevice, addDeviceFailure, addDeviceSuccess, loadDevices, loadDevicesFailure, loadDevicesSuccess } from './device.actions';

@Injectable()
export class DeviceEffects {
  constructor(private actions$: Actions, private deviceService: DeviceService) {}

  // create only 2 effect to show how they work as there are for get all devices, and save one.
  // when a action is dispatch, reducers are responsible to make this actions in global state, but effects are responsible to do the api call 
  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDevices), // type of action
      switchMap(() =>  // using switchMap to cancel all other api calls for getting the devices and returning the latest devices 
        from(this.deviceService.getAllDevices().pipe( // giving the httpClient call for particular request
        map((devices) => loadDevicesSuccess({devices: devices})), // if there is result invoke success result action to change the state 
        catchError((error) => of(loadDevicesFailure(error))) // error handling invoking error action to change the state
      )))
    )
  );

  saveDevice$ = createEffect(() => 
  this.actions$.pipe(
    ofType(addDevice),
    exhaustMap((device) => { // using exhaustMap to prevent multiple other requests(observables) until this inner(api call) is completed
      return this.deviceService.saveDevice(device.device).pipe(
        map((data) => addDeviceSuccess({device: data})),
        catchError((error) => of(addDeviceFailure(error)))
      )
    })

  )
)
}