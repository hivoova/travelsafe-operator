import { Component , NgZone} from '@angular/core';
import { NavController , Platform } from 'ionic-angular';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { RegisterRequest } from '../../models/user';
import { GlobalServices } from '../../services';

import { LoaderUtil } from '../../utilities/loader';
import { AlertUtil } from '../../utilities/alert';
import { StorageUtil } from '../../utilities/storage';
import { StoreUtil } from '../../utilities/store';

// import { HomePage } from '../home/home';
import { ShowMoreJobPage } from '../show-more-job/show-more-job';

import { UserAction } from '../../actions/user';
import { SOCKET_LINK , PUSH_TOKEN } from '../../settings'
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import * as io from "socket.io-client";
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup
  submitAttempt: boolean
  registerSuccess: boolean
  tryToAuth: boolean
  EMAIL_REGEXP:any
  registerRequest: RegisterRequest
  socket: any
  
  constructor( 
    public navCtrl: NavController ,
    private _services: GlobalServices ,
    private _fb: FormBuilder ,
    private _loader: LoaderUtil,
    private _alert: AlertUtil,
    private _storage: StorageUtil,
    private _store: StoreUtil,
    private _userAction : UserAction,
    private _zone: NgZone,
    private _push: Push ,
    public _platform : Platform
  ) {
    this.EMAIL_REGEXP = "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"
    this.registerForm = this._fb.group({
      name: ['' , Validators.compose([Validators.required , Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      email: ['' , Validators.compose(
          [
            Validators.required , 
            Validators.pattern(this.EMAIL_REGEXP)
          ])
        ]
    })
    this.registerSuccess = false
    this.submitAttempt = false
    this.tryToAuth = true
    this._platform.ready().then(() => {
      // alert('platform ready')
      this.login()
    })
  }

  // ionViewWillEnter () {
  //   this.login()
  // }

  login(){
    this._storage.getFromStorage('@user:data')
    .then(res => {
      if(res){
        var resJson = JSON.parse(res)
        this.tryToAuth = true
        this._loader.loading('Login...')
        setTimeout(()=> {
          this._services.tryToAuth(resJson.result.key , resJson.result.user)
          .then(res => {
            if(res['code'] == 2) {
              this.tryToAuth = true
              this.registerSuccess = true
              this._push.register().then((t: PushToken) => {
                console.log(t)
                return this._push.saveToken(t);
                }).then((t: PushToken) => {
                  this._store.dispatch(this._userAction.addUserToStorage({key:resJson.result.key , user:resJson.result.user}))
                  this._storage.getFromStorage('@device:token') 
                  .then(
                    res => {
                      if(res == null) {
                        this.socket = io.connect('http://'+SOCKET_LINK);
                        this._storage.setToStorage('@device:token' , {token: t.token})
                        this.socket.emit('save-device' , {affiliate: resJson.result.affiliate , token: t.token , server:'AU' , push_token : PUSH_TOKEN})
                      }
                      this.socket = null
                      this._loader.loaded()  
                      this.navCtrl.setRoot(ShowMoreJobPage)
                    }
                  )
                })
              .catch(err => {
                this._alert.basicAlert('Error' , err)
              })
              // this._store.dispatch(this._userAction.addUserToStorage({key:resJson.result.key , user:resJson.result.user}))
              // this._loader.loaded()
              // this.navCtrl.setRoot(ShowMoreJobPage)
            }else{
              this.tryToAuth = false
              this.registerSuccess = true
              this._loader.loaded()
            }
          })
          .catch(error => {
            this._loader.loaded()
            this._alert.basicAlert('Connection' , error.message)
            this.tryToAuth = false 
            this.registerSuccess = true
          })
        }, 1000)
      }else{
        this.tryToAuth = false
        this.registerSuccess = false
      }
    })
  }

  refresh() {
    this.login()
  }
  
  submit(){
    this.submitAttempt = true
    if(this.registerForm.valid) {
      this._loader.loading('Register...')
      this.registerRequest = {
        name: this.registerForm.controls['name'].value ,
        email: this.registerForm.controls['email'].value
      }
      this._services.register(this.registerRequest)
      .then(res => {
        if(res['code'] == 2) {
          this._storage.setToStorage('@user:data' , JSON.stringify(res))
          this.registerSuccess = true
          this._alert.basicAlert('Result' , 'A confirmation email has been sent. Please confirm this user then click REFRESH to continue.')
        }else{
          this._alert.basicAlert('Result' , res['text'])
        }
        this._loader.loaded()
      })
      .catch(error => {
        this._alert.basicAlert('Conection' , error.message)
        this._loader.loaded()
      })
    }
  }
}
