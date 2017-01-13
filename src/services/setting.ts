import { Injectable } from '@angular/core' ;
import { Http , Headers  } from '@angular/http';
import { API_LINK , ACCESS_KEY , API_VERSION , COMPANY} from '../settings'
@Injectable() 
export class SettingService {
    constructor(
        private _http: Http
    ){}

    _getSettings(){
        var headers = new Headers();
        headers.append('x-access-key', ACCESS_KEY)
        return this._http.get(
            `http://${API_LINK}/api/${COMPANY}/${API_VERSION}/settings/`,
            {headers: headers}
        )
    }
}