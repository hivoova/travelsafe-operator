import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SettingAction {
    static LOAD_SETTING_SUCCESS = 'LOAD_SETTING_SUCCESS';
    loadSettingSuccess(settings) : Action {
        return {
            type: SettingAction.LOAD_SETTING_SUCCESS,
            payload: settings
        }
    }
}