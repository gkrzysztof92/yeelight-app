import { Action } from '@ngrx/store';
import { Device } from '../../../yeelight-api/model/device';
import { Command, CommandResponse } from '../../../yeelight-api/model/command';

export enum DeviceActionTypes {

    DiscaveryDevices = '[Device] Discavery Devices',
    SetCurrentDevice = '[Device] Set Current Device',

    DeviceCommand = '[Device] Command Device',

    ToggleDeviceActionSuccess = '[Device] Toggle Device Success',
    SetBrightDeviceActionSuccess = '[Device] Set Bright Device Success'
}

export class DiscaveryDevices implements Action {
    readonly type = DeviceActionTypes.DiscaveryDevices;
    constructor(public payload: Device[]) { }
}

export class SetCurrentDevice implements Action {
    readonly type = DeviceActionTypes.SetCurrentDevice;
    constructor(public payload: Device) { }
}

export class DeviceCommand implements Action {
    readonly type = DeviceActionTypes.DeviceCommand;
    constructor(public payload: Command) { }
}

export class ToggleDeviceCommandSuccess implements Action {
    readonly type = DeviceActionTypes.ToggleDeviceActionSuccess;
    constructor(public payload: CommandResponse) { }
}

export class  SetBrightDeviceCommandSuccess implements Action {
    readonly type = DeviceActionTypes.SetBrightDeviceActionSuccess;
    constructor(public payload: CommandResponse) { }
}


export type DeviceActions = DiscaveryDevices | SetCurrentDevice |
            DeviceCommand | ToggleDeviceCommandSuccess | SetBrightDeviceCommandSuccess;
