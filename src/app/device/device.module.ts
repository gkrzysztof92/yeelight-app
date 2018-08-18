import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceComponent } from './device/device.component';
import { RouterModule } from '@angular/router';
import { Device } from '../../yeelight-api/model/device';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'device/:id', component: DeviceComponent}
    ])
  ],
  declarations: [
    DevicesListComponent,
    DeviceComponent,
  ],
  exports: [
    DevicesListComponent
  ]
})
export class DeviceModule { }
