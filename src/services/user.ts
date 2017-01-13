import { Injectable } from '@angular/core' ;
import { Http , Headers , Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RegisterRequest } from '../models/user'
import * as moment from 'moment';
import { API_LINK , ACCESS_KEY , API_VERSION , COMPANY} from '../settings'
@Injectable()
export class UserService {
    constructor(
        private _http: Http,
    ){}

    _register(registerRequest:RegisterRequest) : Observable<Response>  {
        var headers = new Headers();
        var body = `_e=${registerRequest.email}&_n=${registerRequest.name}`;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('x-access-key', ACCESS_KEY)
        return this._http.post(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/register`,
            body,
            {headers: headers}
        )
    }

    _tryToAuth(appCode: string , userId: number) {
        var token = btoa(btoa(moment().format('YYYY-MM-DD'))+'_'+btoa(userId.toString())+'_'+appCode)
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        headers.append('x-access-token', token)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/checkToken`,
            {headers: headers}
        )
    }
}