import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    DevicesListComponent
  ],
  exports: [
    DevicesListComponent
  ]
})
export class DeviceModule { }
