import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DeviceComponent } from './device/device.component';

import { DevicesListComponent } from './devices-list/devices-list.component';

import { StoreModule } from '@ngrx/store'
import { reducer } from './state/device.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('devices', reducer)
  ],
  declarations: [
    DevicesListComponent,
    DeviceComponent,
  ],
  exports: [
    DevicesListComponent,
    DeviceComponent
  ]
})
export class DeviceModule { }
