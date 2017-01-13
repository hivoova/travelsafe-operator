import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { JobDetail , AvailableJob , WaitAcceptJob} from '../models/job';

Injectable()
export class JobAction {
    static LOAD_JOB_DETAIL_SUCCESS = 'LOAD_JOB_DETAIL_SUCCESS';
    loadJobDetailSuccess(jobDetail: Array<Array<JobDetail>>) : Action{
        return {
            type: JobAction.LOAD_JOB_DETAIL_SUCCESS,
            payload: jobDetail
        }
    }

    static LOAD_AVAILABLE_JOB_SUCCESS = 'LOAD_AVAILABLE_JOB_SUCCESS';
    loadAvailableJobSuccess(availableJob: Array<AvailableJob>) : Action {
        return {
            type: JobAction.LOAD_AVAILABLE_JOB_SUCCESS,
            payload: availableJob
        }
    }

    static LOAD_WAIT_ACCEPT_JOB_SUCCESS = 'LOAD_WAIT_ACCEPT_JOB_SUCCESS';
    loadWaitAcceptJobSuccess(waitAcceptJob: Array<WaitAcceptJob>) : Action {
        return {
            type: JobAction.LOAD_WAIT_ACCEPT_JOB_SUCCESS,
            payload: waitAcceptJob
        }
    }

    static UPDATE_NEW_AVAILABLE = 'UPDATE_NEW_AVAILABLE';
    updateNewAvailable(count: number) : Action {
        return {
            type: JobAction.UPDATE_NEW_AVAILABLE,
            payload: count
        }
    }

    static DECREAMENT_COUNT_AVAILABLE = 'DECREAMENT_COUNT_AVAILABLE';
    decreamentCountAvailable(): Action {
        return{
            type: JobAction.DECREAMENT_COUNT_AVAILABLE
        }
    }

    
}