import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../../yeelight-api/model/device';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class DevicesService {

  devices = new BehaviorSubject<Device[]>([]);

  constructor(
    private electronService: ElectronService
  ) {
    this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      if (this.devices.value.filter(dev => dev.location === arg.location).length === 0) {
        console.log(arg);
        this.devices.value.push(arg);
        this.devices.next(this.devices.value)
      }
    });
  }

  discaveryDevices() {
    this.electronService.ipcRenderer.send('discavery-devices');
  }

}
