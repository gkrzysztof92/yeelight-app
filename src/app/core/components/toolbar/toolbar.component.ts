import { Component } from '@angular/core';
import { DevicesService } from '../../services/devices.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private devicesService: DevicesService 
  ) { }

  refreshDevices() {
    this.devicesService.discaveryDevices();
  }

}
