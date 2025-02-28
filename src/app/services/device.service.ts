import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }

  getAllDevices(): Observable<Device[]>{
    return this.httpClient.get<Device[]>('http://localhost:8080/devices');
  }
  saveDevice(device: Device) {
    let jsonDevice = JSON.stringify(device);
    return this.httpClient.post<Device>('http://localhost:8080/devices',jsonDevice);
  }
  editDevice(device: Device){
    let jsonDevice = JSON.stringify(device);
    return this.httpClient.put<Device>(`http://localhost:8080/devices/${device.id}`,jsonDevice).pipe(
      catchError(error => of((error)))
    );
  }
  deleteDevice(deviceId: string){
    return this.httpClient.delete(`http://localhost:8080/devices/${deviceId}`).pipe(
      catchError(error => of((error)))
    );
  }

}
