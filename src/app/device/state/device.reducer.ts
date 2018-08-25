import * as fromDevice from './device.state'
import { DeviceActions, DeviceActionTypes } from './device.actions';

export function reducer(state = fromDevice.initialState, action: DeviceActions): fromDevice.DeviceState {
    console.log(JSON.stringify(action));
    switch (action.type) {
        case DeviceActionTypes.DiscaveryDevices:
            const devices = state.devices;
            const deviceIndex = devices.findIndex(d => action.payload.id === d.id);
            deviceIndex === -1 ? devices.push(action.payload) : devices[deviceIndex] = action.payload;
            return {
                ... state,
                devices: devices
            };
        case DeviceActionTypes.SetCurrentDevice:
            return {
                ... state,
                currentDevice: action.payload
            };
        default:
            return state;
    }
}