import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Device } from '../../../yeelight-api/model/device';

import { map } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material';
import { Command } from '../../../yeelight-api/model/command';
import { Store, select } from '@ngrx/store';
import { DeviceState } from '../state/device.state';

import * as deviceActions from '../../device/state/device.actions';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device: Device;

  constructor(
    private store: Store<DeviceState>,
  ) { }

  ngOnInit() {
    this.store.pipe(select('devices'))
      .pipe(map(devices => devices.currentDevice))
      .subscribe(device => {
        this.device = device;
      });
  }

  toggleDevice() {
    const cmd = { deviceIp: this.device.location,
      commandPayload: { id: 1, method: 'toggle', params: [] }
    } as Command;
    this.store.dispatch(new deviceActions.DeviceCommand(cmd));
  }

  setBright(valueChange: MatSliderChange) {
    const cmd = { deviceIp: this.device.location,
      commandPayload: {id: 1, method: 'set_bright', params: [valueChange.value, 'smooth', 500]}
    } as Command;
  }

}
