import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DevicesService } from 'src/app/core/services/devices.service';

import * as fromActions from './device.actions';


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
          switchMap((action: fromActions.DeviceCommand) => {
            this.devicesService.sendCommand(action.payload);
            return of({});
          })
        );

}
