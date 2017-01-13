import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WaitAcceptPage } from '../wait-accept/wait-accept';
import { AvailableJobPage } from '../available-job/available-job';
import { GlobalServices } from '../../services';
import { StoreUtil } from '../../utilities/store'
import { User } from '../../models/user'
import { JobAction } from '../../actions/job'
/*
  Generated class for the ShowMoreJob page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-more-job',
  templateUrl: 'show-more-job.html'
})
export class ShowMoreJobPage {

  available: any = AvailableJobPage
  waitAccept: any = WaitAcceptPage
  timer: any;
  userData: User;
  countNew: number;
  countBadge: string

  constructor(
    public navCtrl: NavController,
    private _service: GlobalServices,
    private _store: StoreUtil ,
    private _jobAction: JobAction
  ) {
    this.timer = null
    this.countBadge = ""
    this.countNew = 0
  }

  ionViewDidLoad(){
    this._store.select('userState')
    .subscribe(
      res => {
        this.userData = res.user
        this.autoLoadNew()
      }
    )
    this._store.select('jobState')
    .subscribe(
      res => {
        this.countNew = res.newAvailable
        if(this.countNew > 0) {
          this.countBadge = this.countNew.toString()
        }else{
          this.countBadge = ""
        }
      }
    )
    this.timer = setInterval(()=>{
      if(this.userData){
        this.autoLoadNew()
      }
    }, 60000)
  }

  autoLoadNew(){
    this._service.newBid(this.userData.key , this.userData.user)
    .then(res=>{
      this._store.dispatch(this._jobAction.updateNewAvailable(res['result'][0].count))
    })
  }

  logout() {
    alert('logout')
  }
  

}
