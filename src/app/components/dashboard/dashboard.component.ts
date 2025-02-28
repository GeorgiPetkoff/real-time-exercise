import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiclesRecognition } from 'src/app/models/vehicles-recognition';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['camera', 'timestamp', 'registrationNumber', 'vehicleType', 'brand', 'color', 'location'];
  dataSource = []
  constructor(private webSocketService: WebSocketService) {
  }
  ngOnInit(): void {
    this.webSocketService.getDataFromServer().subscribe((vehicleData) => {
      console.log('subscr');
      if(vehicleData){
        // this.dataSource.data.push(vehicleData);
        // this.dataSource._updateChangeSubscription();
      }
    });
  }

  stopSubscription(){
    this.webSocketService.closeConnection();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
  }
  

}
