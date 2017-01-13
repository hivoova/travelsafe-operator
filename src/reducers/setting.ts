import { SettingAction } from '../actions/setting';

export interface SettingState {
    setting: Object
}

const InitState : SettingState = {
    setting: {}
}

export function SettingReducer (state = InitState , action ) {
    switch(action.type) {
        case SettingAction.LOAD_SETTING_SUCCESS :
            return Object.assign({} , state , { setting: action.payload })
        default :
            return state
    }
}