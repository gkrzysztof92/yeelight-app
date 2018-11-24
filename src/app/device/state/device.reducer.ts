import * as fromDevice from './device.state';
import { DeviceActions, DeviceActionTypes } from './device.actions';
import { Device } from 'src/yeelight-api/model/device';

export function reducer(state = fromDevice.initialState, action: DeviceActions): fromDevice.DeviceState {
    console.log(JSON.stringify(action));
    switch (action.type) {
        case DeviceActionTypes.DiscaveryDevices:
            return {
                ... state,
                devices: action.payload
            };
        case DeviceActionTypes.SetCurrentDevice:
            return {
                ... state,
                currentDevice: action.payload
            };
        case DeviceActionTypes.ToggleDeviceActionSuccess:
            const currentDevice = {
                ... state.currentDevice,
                power: state.currentDevice.power === 'on' ? 'off' : 'on'
            } as Device;
            return {
                currentDevice: currentDevice,
                devices: state.devices.map(device => device.id === currentDevice.id ? currentDevice : device)
            };
        case DeviceActionTypes.SetBrightDeviceActionSuccess:
            const sbDevice = {
                ... state.currentDevice,
                bright: +action.payload.payload.params[0]
            } as Device;
            return {
                currentDevice: sbDevice,
                devices: state.devices.map(device => device.id === sbDevice.id ? sbDevice : device)
            };
        default:
            return state;
    }
}