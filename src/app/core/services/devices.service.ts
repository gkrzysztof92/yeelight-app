import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../../yeelight-api/model/device';
import { ElectronService } from 'ngx-electron';
import { Command } from '../../../yeelight-api/model/command';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as deviceActions from '../../device/state/device.actions'

@Injectable()
export class DevicesService {

  devices = new BehaviorSubject<Device[]>([]);

  constructor(
    private electronService: ElectronService,
    private store: Store<State>
  ) {
    this.electronService.ipcRenderer.on('asynchronous-reply', 
      (event, arg) => this
        .store.dispatch(new deviceActions.DiscaveryDevices(arg)));

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
