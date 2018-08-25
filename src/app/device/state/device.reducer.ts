import * as fromDevice from './device.state'
import { DeviceActions, DeviceActionTypes } from './device.actions';

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
        default:
            return state;
    }
}