import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesService } from './services/devices.service';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [
    CommonModule,
    NgxElectronModule
  ],
  declarations: [],
  providers: [
    DevicesService
  ]
})
export class CoreModule { }
