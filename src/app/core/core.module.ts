import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesService } from './services/devices.service';
import { NgxElectronModule } from 'ngx-electron';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxElectronModule
  ],
  declarations: [
    ToolbarComponent
  ],
  providers: [
    DevicesService
  ],
  exports: [
    ToolbarComponent
  ]
})
export class CoreModule { }
