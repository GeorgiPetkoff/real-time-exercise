import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.css'],
    standalone: false
})
export class DeviceComponent implements OnInit {
  deviceForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { 
    this.deviceForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      ipAddress: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

}
