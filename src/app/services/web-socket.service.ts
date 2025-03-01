import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { VehiclesRecognition } from '../models/vehicles-recognition';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<VehiclesRecognition>;
  
  constructor() {
    this.socket$ = webSocket('ws://localhost:8081');
   }

  public getDataFromServer(): Observable<VehiclesRecognition> {
    return this.socket$.asObservable();
  }

  public closeConnection() {
    this.socket$.complete();
  }
}
