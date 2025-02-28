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
    this.allDevices$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
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
    console.log('form',this.deviceForm.get('ipAddress')?.value)
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
            // console.log('result')
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
