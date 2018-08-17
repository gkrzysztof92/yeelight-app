import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../core/services/devices.service';
import { Device } from '../../../yeelight-api/model/device';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  devices: Device[] = [];

  constructor(
    private devicesService: DevicesService
  ) { }

  ngOnInit() {
    this.devicesService.devices
      .subscribe(devices => this.devices = devices);
  }

}
