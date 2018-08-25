import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DevicesService } from '../../core/services/devices.service';
import { Device } from '../../../yeelight-api/model/device';

import { switchMap, map, filter } from 'rxjs/operators';
import { MatSlideToggleChange, MatSliderChange } from '@angular/material';
import { Command } from '../../../yeelight-api/model/command';
import { Store, select } from '@ngrx/store';
import { DeviceState } from '../state/device.state';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device: Device;

  constructor(
    private store: Store<DeviceState>,
    private devicesService: DevicesService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.pipe(select('devices'))
      .pipe(map(devices => devices.currentDevice))
      .subscribe(device => {
        this.device = device;
        this.cd.detectChanges();
      });
  }

  toggleDevice() {
    const cmd = { deviceIp: this.device.location,  
      commandPayload: { id: 1, method: 'toggle', params: [] }
    } as Command;  
    this.devicesService.sendCommand(cmd);
  }

  setBright(valueChange: MatSliderChange) {
    const cmd = { deviceIp: this.device.location,
      commandPayload: {id: 1, method: 'set_bright', params: [valueChange.value, 'smooth', 500]}
    } as Command
    this.devicesService.sendCommand(cmd);
  }

}
