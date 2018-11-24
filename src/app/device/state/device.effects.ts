import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DevicesService } from 'src/app/core/services/devices.service';
import { of } from 'rxjs';

import * as fromActions from './device.actions';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class DeviceEffects {

    constructor(
        private actions$: Actions,
        private devicesService: DevicesService
    ) { }

    @Effect(
        { dispatch: false }
    )
    toggleDevice$ = this.actions$
        .pipe(
          ofType(fromActions.DeviceActionTypes.DeviceCommand),
          switchMap(action => {
            this.devicesService.sendCommand(action.payload);
            return of({});
          })
        );

}
