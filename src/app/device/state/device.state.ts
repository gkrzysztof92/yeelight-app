import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { Device } from '../../../yeelight-api/model/device';

export interface State extends fromRoot.State {
    devices: DeviceState;
}

export interface DeviceState {
    currentDevice: Device;
    devices: Device[];
}

export const initialState: DeviceState = {
    currentDevice: null,
    devices: []
};
