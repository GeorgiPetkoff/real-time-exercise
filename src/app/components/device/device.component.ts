import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';
import { addDevice, loadDevices } from 'src/app/state/device.actions';
import { selectAllDevices } from 'src/app/state/device.selector';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.css'],
    standalone: false
})
export class DeviceComponent implements OnInit {
  deviceForm: FormGroup;
  lstStatuses: string[] = ['Connected','Disconnected'];
  submitted = false;
  allDevices$ = this.store.select(selectAllDevices);
  searchControl = new FormControl('');
  
  constructor(private formBuilder: FormBuilder, private store: Store, private deviceService: DeviceService) { 
    this.deviceForm = new FormGroup({})
  }


  ngOnInit(): void {
    // this.store.dispatch(loadDevices());
    this.initForm(); 
    // describe what the observable of value changes will do
    this.allDevices$ = this.searchControl.valueChanges.pipe(
      startWith(''), // starting value of this observable, to return all devices
      debounceTime(500), // waiting for 500ms after the value change. wait the user to stop typing to prevent overflowing api calls
      distinctUntilChanged(), // this is used to return data only if data is changed changed
      switchMap(searchTerm => this.deviceService.getAllDevices().pipe(
        map(result => result.filter(device => 
          device.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
        ))
      ))
    );
  }

  initForm(){
    this.deviceForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      ipAddress: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  editDevice(device: Device){
    this.deviceForm.reset();
    this.deviceForm.patchValue({
      id: device.id,
      name: device.name,
      model: device.model,
      serialNumber: device.serialNumber,
      ipAddress: device.ipAddress,
      location: device.location,
      status: device.status
    })
  }

  deleteDevice(device: Device){
    // this.store.dispatch(removeDevice({id: device.id}))
    // this can be done with effect also, but decide to show ordinary api calls
    this.deviceService.deleteDevice(device.id).subscribe(
      result => {
        if(result){
          this.store.dispatch(loadDevices());
        }
      }
    )
  }

  addEditDevice(){
    this.submitted = true;
    if(this.deviceForm.valid){
      let device: Device = this.deviceForm.getRawValue();
      if(device.id){
        this.submitted = false;
        this.deviceForm.reset();
        this.deviceService.editDevice(device).subscribe(
          result => {
            if(result){
              this.store.dispatch(loadDevices());
            }
          }
        )
      } else {
        device.id = crypto.randomUUID();
        this.store.dispatch(addDevice({device: device}))
        this.submitted = false;
        this.deviceForm.reset();
      }
    }
  }

}
