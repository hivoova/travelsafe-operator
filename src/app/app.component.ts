import { Component , NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { LocalNotifications } from 'ionic-native';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoaderUtil } from '../utilities/loader';
import { RegisterPage } from '../pages/register/register';
import { GlobalServices } from '../services';
import { StoreUtil } from '../utilities/store';
import { SettingAction } from '../actions/setting';
import { StorageUtil } from '../utilities/storage';
import { AlertUtil } from '../utilities/alert';
// // import { ROOM , SOCKET_LINK} from '../settings'
import {
  Push
} from '@ionic/cloud-angular';
// import * as io from "socket.io-client";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = RegisterPage;
  // socket: any
  // timer: any
  
  constructor(
    private platform: Platform , 
    private _loader: LoaderUtil , 
    private _services: GlobalServices ,
    private _store: StoreUtil ,
    private _settingAction: SettingAction ,
    private _zone: NgZone ,
    private _storage: StorageUtil,
    private _push: Push ,
    private _alert: AlertUtil) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      //   console.log('network was disconnected :-(');
      //   this._loader.loading('Please connect internet.')
      // });
      // let connectSubscription = Network.onConnect().subscribe(() => {
      //   console.log('network connected!');
      //   this._loader.loaded()
      // });
      // this.socket = io.connect('http://'+SOCKET_LINK);
      // this.socket.emit('request-join-room' , { room: ROOM , token: ROOM_TOKEN , server: ROOM_SERVER})
      // this.socket.on('join-room-'+ROOM , (data) => {
      //   console.log(data)
      // })
      setTimeout(()=>this.initialize(),100)
      this._services.getSettings()
      .then(res => {
        if(res['code'] == 2)  {
          this._store.dispatch(this._settingAction.loadSettingSuccess(res['results'][0]))
        }
      })
    });
  }

  initialize() {
    this._storage.getFromStorage('@user:data')
    .then(res => {
      if(res){
        // var resJson = JSON.parse(res)
        // console.log('push-to-'+ROOM+'-'+resJson.result.affiliate)
        // this.socket.on('push-to-'+ROOM+'-'+resJson.result.affiliate , (data) => { 
        //   this._zone.run(()=>{
        //       // alert(data['text'])
        //       LocalNotifications.schedule({
        //         id: 1,
        //         text: data['text'],
        //         sound: this.platform.is('Android') ? 'file://sound.mp3': 'file://beep.caf',
        //         icon: 'file://assets/images/logo.png'
        //       });
        //   })
        //   // console.log('push-to' , data)
        //   // clearInterval(this.timer)
        // }) 

        // this._push.register().then((t: PushToken) => {
        //   return this._push.saveToken(t);
        // }).then((t: PushToken) => {
        //   this._storage.setToStorage('@device:token' , {token: t.token})
        //   alert('token:' + t.token)
        //   this.socket.emit('save-device' , {affiliate: resJson.result.affiliate , token: t.token , server:'AU'})
        // });

        this._push.rx.notification()
        .subscribe((msg) => {
          this._alert.basicAlert(msg.title , msg.text)
        });
      }
    })
  }

  
}
