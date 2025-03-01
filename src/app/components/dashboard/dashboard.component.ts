import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehiclesRecognition } from 'src/app/models/vehicles-recognition';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})

export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['camera', 'timestamp', 'registrationNumber', 'vehicleType', 'brand', 'color', 'location'];
  dataSource = new MatTableDataSource<VehiclesRecognition>();
  constructor(private webSocketService: WebSocketService) {
  }
  ngOnInit(): void {
    this.startSubscription();
  }
  startSubscription(){
    this.webSocketService.getDataFromServer().subscribe((vehicleData) => {
      if(vehicleData){
        this.dataSource.data.push(vehicleData);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  stopSubscription(){
    this.webSocketService.closeConnection();
  }

  ngOnDestroy(): void {
    console.log('On destroy stop')
    this.webSocketService.closeConnection();
  }
  

}
