import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../../yeelight-api/model/device';
import { ElectronService } from 'ngx-electron';
import { Command } from '../../../yeelight-api/model/command';

@Injectable()
export class DevicesService {

  devices = new BehaviorSubject<Device[]>([]);

  constructor(
    private electronService: ElectronService
  ) {
    this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      if (this.devices.value.filter(dev => dev.id === arg.id).length === 0) {
        console.log('Device Discavered: ' + JSON.stringify(arg));
        this.devices.value.push(arg);
        this.devices.next(this.devices.value)
      }
    });
    this.electronService.ipcRenderer.on('command-response', (event, arg) => {
      console.log('Command Response: ' + arg);
    })
  }

  discaveryDevices() {
    this.electronService.ipcRenderer.send('discavery-devices');
  }

  sendCommand(command: Command) {
    console.log('Command: ' + JSON.stringify(command));
    this.electronService.ipcRenderer.send('send-command', command);
  }

}
