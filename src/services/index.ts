import { Injectable } from '@angular/core' ;
import { Platform } from 'ionic-angular';  
import { RegisterRequest } from '../models/user';
import { AcceptRequest } from '../models/job';
import { UserService } from './user';
import { JobService } from './job';
import { SettingService } from './setting';
import { UserAction } from '../actions/user';
import { StoreUtil } from '../utilities/store';
import { AlertUtil } from '../utilities/alert';

import { UnregisteredPage } from '../pages/unregistered/unregistered' 


@Injectable()

export class GlobalServices {
    constructor(
        private _user: UserService ,
        private _store : StoreUtil ,
        private _userAction: UserAction ,
        private _job: JobService ,
        private platform: Platform,
        private _alert : AlertUtil, 
        private _setting: SettingService 
    ){}


    register(registerRequest:RegisterRequest) : Promise<Object>{
        return new Promise ((resolve , reject) => {
            this._user._register(registerRequest) 
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                } ,
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    tryToAuth(key:string , user:number) : Promise<Object>{
        return new Promise ((resolve , reject) => {
            this._user._tryToAuth(key , user) 
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                } ,
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getAvailableJobs(key:string , user:number) : Promise<Object> {
        return new Promise ((resolve , reject) => {
            this._job._getAvailableJobs(key , user) 
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getAvailableJobsNew(key:string , user:number , count: number) : Promise<Object> {
        return new Promise ((resolve , reject) => {
            this._job._getAvailableJobsNew(key , user , count) 
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getJobDetail(key:string , user:number , quoteId: number) : Promise<Object> {
        return new Promise ((resolve , reject) => {
            this._job._getJobDetail(key , user , quoteId) 
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                } ,
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    acceptJob(key: string , user: number , acceptRequest:AcceptRequest ) {
        return new Promise((resolve ,reject)=>{
            this._job._acceptJob(key , user , acceptRequest)
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getWaitAccept(key: string , user: number) {
        return new Promise((resolve ,reject) =>{
            this._job._getWaitAccept(key, user)
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getSettings() {
        return new Promise((resolve ,reject) =>{
            this._setting._getSettings()
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    confirmJob(key: string , user: number , assignData: any) {
        return new Promise((resolve ,reject)=>{
            this._job._confirmJob(key,user,assignData)
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    getBidHistory(key: string , user: number , quoteId: number , dateKeys: Array<string> , movementIds: Array<Array<number>>){
        return new Promise((resolve , reject) => {
            this._job._getBidHistory(key,user,quoteId,dateKeys,movementIds)
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    reject(key:string , user: number , quoteId: number , dateKey: string , movementIds: Array<Array<number>>) {
        return new Promise((resolve , reject) => {
            this._job._rejectBid(key, user ,quoteId ,dateKey ,movementIds)
            .subscribe(
                res => {
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    newBid(key:string , user:number) {
        return new Promise((resolve , reject)=>{
            this._job._newBid(key , user)
            .subscribe(
                res =>{ 
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    activeBid(key:string , user:number , quote_id :number) {
        return new Promise((resolve , reject)=>{
            this._job._activeBid(key , user , quote_id)
            .subscribe(
                res =>{ 
                    var resJson = res.json()
                    resolve(resJson)
                },
                err => {
                    var error = err.json()
                    console.log(error)
                    reject(new Error(error.err))
                }
            )
        })
    }

    logout(){
        return UnregisteredPage
    }
}