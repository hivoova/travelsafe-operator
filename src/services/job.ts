import { Injectable } from '@angular/core' ;
import { Http , Headers   } from '@angular/http';
import { AcceptRequest } from '../models/job'
import * as moment from 'moment';
import { API_LINK , ACCESS_KEY , API_VERSION , COMPANY} from '../settings'
@Injectable()
export class JobService {
    constructor(
        private _http: Http,
    ){}

    _getAvailableJobs(appCode: string , userId: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/available-jobs`,
            {headers: headers}
        )
    }

    _getAvailableJobsNew(appCode: string , userId: number , count:number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/available-jobs-new/${count}`,
            {headers: headers}
        )
    }

    _getJobDetail(appCode: string , userId: number , quoteId: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/jobbidroute-detail/${quoteId}`,
            {headers: headers}
        )
    }

    _acceptJob(appCode: string , userId: number , acceptRequest: AcceptRequest) {
        acceptRequest._dateKey = moment(acceptRequest._dateKey , 'DD MMM YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        var body = JSON.stringify(acceptRequest) 
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.post(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/acceptBid/`,
            body,
            {headers: headers}
        )
    }

    _getWaitAccept(appCode: string , userId: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/waitaccept-job`,
            {headers: headers}
        )
    }

    _confirmJob(appCode: string , userId: number , assignData: Object) {
        var body = JSON.stringify({_assignData:assignData}) 
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.post(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/confirmJob`,
            body,
            {headers: headers}
        )
    }

    _getBidHistory(appCode: string , userId: number , quote_id: number ,dateKeys: Array<string> , movementIds: Array<Array<number>>) {
        var body = JSON.stringify({_quoteId:quote_id , _movementIds: movementIds , _dateKeys: dateKeys}) 
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.post(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/bidHistory`,
            body,
            {headers: headers}
        )
    }

    _rejectBid(appCode: string , userId: number , quote_id: number , dateKey: string , movementIds: Array<Array<number>>) {
        
        var body = JSON.stringify({_quoteId:quote_id , _movementIds: movementIds , _dateKey: dateKey}) 
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.post(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/reject`,
            body,
            {headers: headers}
        )
    }

    _newBid(appCode: string , userId: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/new`,
            {headers: headers}
        )
    }

    _activeBid(appCode: string , userId: number , quote_id: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' )
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/jobs/actived/${quote_id}`,
            {headers: headers}
        )
    }
}