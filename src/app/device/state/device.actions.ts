import { Action } from "@ngrx/store";
import { Device } from '../../../yeelight-api/model/device';

export enum DeviceActionTypes {
    DiscaveryDevices = '[Device] Discavery Devices',
    SetCurrentDevice = '[Device] Set Current Device',
}

export class DiscaveryDevices implements Action {
    readonly type = DeviceActionTypes.DiscaveryDevices;
    constructor(public payload: Device) { };
}

export class SetCurrentDevice implements Action {
    readonly type = DeviceActionTypes.SetCurrentDevice;
    constructor(public payload: Device) { };
}

export type DeviceActions = DiscaveryDevices | SetCurrentDevice;