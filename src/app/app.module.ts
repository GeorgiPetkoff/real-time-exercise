import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceComponent } from './components/device/device.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { StoreModule } from '@ngrx/store'
import {MatTableModule} from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { deviceReducer } from './state/device.reducers';
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { DeviceEffects } from './state/device.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    StoreModule.forRoot({ devices: deviceReducer }),
    DatePipe,
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    EffectsModule.forRoot([DeviceEffects])
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
