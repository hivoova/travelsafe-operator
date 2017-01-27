import { Component } from '@angular/core';
import { GlobalServices } from '../../services';
import { User } from '../../models/user';
import { LoaderUtil } from '../../utilities/loader';
import { StoreUtil } from '../../utilities/store';
import { AlertUtil } from '../../utilities/alert';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData: User
  availableJobs: any
  _moment: any
  constructor(
    public navCtrl: NavController,
    private _services: GlobalServices,
    private _loader: LoaderUtil ,
    private _store: StoreUtil ,
    private _alert: AlertUtil
  ) {
    this._moment = moment
  }

  ionViewWillEnter(){
    this._store.select('userState')
    .subscribe(
      res => {
        this.userData = res.user
        console.log(this.userData)
        this._loader.loading('Loading...')
        setTimeout(()=>{
          console.log(this.userData.key)
          this._services.getAvailableJobs(this.userData.key , this.userData.user)
          .then(
            res => {
              this._loader.loaded()
              this.availableJobs = res['results']
            }
          )
          .catch(err => {
            this._loader.loaded()
          })
        }, 1000)
      }
    )
  }
}
