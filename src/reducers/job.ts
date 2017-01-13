import { JobAction } from '../actions/job';
import { JobDetail } from '../models/job';

export interface JobState {
    jobDetail : Array<Array<JobDetail>>,
    newAvailable: number
}

const InitState : JobState = {
    jobDetail : [] ,
    newAvailable: 0
}

export function JobReducer (state = InitState , action ) {
    switch(action.type) {
        case JobAction.LOAD_JOB_DETAIL_SUCCESS :
            return Object.assign({} , state , { jobDetail: action.payload })
        case JobAction.UPDATE_NEW_AVAILABLE :
            return Object.assign({} , state , {newAvailable: action.payload })
        case JobAction.DECREAMENT_COUNT_AVAILABLE :
            return Object.assign({} , state , {newAvailable: (state.newAvailable - 1 < 0) ? 0 : state.newAvailable - 1 })
        default :
            return state
    }
}