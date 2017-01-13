
import * as fromUser from './user';
import * as fromJob from './job';
import * as fromSetting from './setting'


export interface AppState {
    userState: fromUser.UserState,
    jobState: fromJob.JobState,
    settingState: fromSetting.SettingState
}

// export const reducers = compose(combineReducers)({
//    userState: fromUser.UserReducer,
//    jobState: fromJob.JobReducer,
//    settingState: fromSetting.SettingReducer
// })