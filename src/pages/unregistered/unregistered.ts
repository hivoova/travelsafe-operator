import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageUtil } from '../../utilities/storage';
import { StoreUtil } from '../../utilities/store'; 
import { RegisterPage } from '../register/register';
import { AlertUtil } from '../../utilities/alert';
import { UserAction } from '../../actions/user';
/*
  Generated class for the Unregistered page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-unregistered',
  templateUrl: 'unregistered.html'
})
export class UnregisteredPage {

  constructor(
    public navCtrl: NavController,
    private _storage: StorageUtil ,
    private _store: StoreUtil,
    private _userAction: UserAction,
    private _alert: AlertUtil
  ) {}

  // ionViewDidLoad() {
  //   console.log('Hello UnregisteredPage Page');
  // }

  back() {
    this.navCtrl.pop()
  }

  destroyUser() {
    this._alert.confirmAlert('Warning' , 'Are you confirm to unregister ?')
    .then(
      res => {
        if(res['confirm']) {
          this._storage.removeAll()
          this._store.dispatch(this._userAction.addUserToStorage({key:"" , user: 0}))
          this.navCtrl.setRoot(RegisterPage)
        }
      }
    )
  }

}
