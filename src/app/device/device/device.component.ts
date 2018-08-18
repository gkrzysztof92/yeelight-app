import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../core/services/devices.service';
import { Device } from '../../../yeelight-api/model/device';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device: Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DevicesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.deviceService.devices
        .pipe(map(devices => devices.find(device => device.id === params.get('id'))))
        .subscribe(device => this.device = device);
    });
  }

}
