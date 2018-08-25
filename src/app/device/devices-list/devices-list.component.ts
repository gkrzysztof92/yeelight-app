import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DevicesService } from '../../core/services/devices.service';
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

  constructor(
    private store: Store<fromDevice.DeviceState>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.pipe(select('devices'))
      .subscribe(devices => {
        if(devices) {
          this.devices = devices.devices;
          this.cd.detectChanges();
        }
      });
  }

  selectDevice(device: Device) {
    this.store.dispatch(new devicesActions.SetCurrentDevice(device));
  }

}
