import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Device } from '../../../yeelight-api/model/device';
import { Store, select } from '@ngrx/store';

import * as fromDevice from '../state/device.state';
import * as devicesActions from '../state/device.actions';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  devices: Device[];
  selectedDeviceId: string;

  constructor(
    private store: Store<fromDevice.DeviceState>,
  ) { }

  ngOnInit() {
    this.store.pipe(select('devices'))
      .subscribe(devices => {
        if (devices) {
          this.devices = devices.devices;
        }
      });
  }

  selectDevice(device: Device) {
    this.selectedDeviceId = device.id;
    this.store.dispatch(new devicesActions.SetCurrentDevice(device));
  }

}
