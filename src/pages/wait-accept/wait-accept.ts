import { Component } from '@angular/core';
import { NavController , Tabs } from 'ionic-angular';
import { GlobalServices } from '../../services';
import { WaitAcceptJob } from '../../models/job';
import { User } from '../../models/user';
import { LoaderUtil } from '../../utilities/loader';
import { AlertUtil } from '../../utilities/alert';
import { StoreUtil } from '../../utilities/store';
import * as moment from 'moment';

/*
  Generated class for the WaitAccept page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wait-accept',
  templateUrl: 'wait-accept.html'
})
export class WaitAcceptPage {

  userData: User
  waitAcceptJob: Array<WaitAcceptJob>
  lastUpdated: string
  _moment: any
  expandJob : Array<boolean>

  constructor(
    public navCtrl: NavController,
    private _services: GlobalServices,
    private _loader: LoaderUtil ,
    private _store: StoreUtil ,
    private _alert: AlertUtil ,
    private _tab: Tabs
    ) {
      this.waitAcceptJob = []
      this._moment = moment
      this.expandJob = []
    }

    ionViewWillEnter () {
      this._store.select('userState').subscribe(res => {
        this.userData = res.user
        this._loader.loading('Loading...')
        setTimeout(()=>{
          this._services.getWaitAccept(this.userData.key , this.userData.user)
          .then(res => {
            if(res) {
              this.waitAcceptJob = res['results']
              for(let i = 0 ; i < this.waitAcceptJob.length; i++) {
                this.expandJob.push(false)
              }
            }
            this.lastUpdated = moment().format('DD MMM YYYY HH:mm')
            this._loader.loaded()
          })
          .catch(err => {
            this._loader.loaded()
            this._alert.basicAlert('Connection' , err.message)
          })
        },1000)
      })
    }

    showMoreDetail(mainIndex) {
      this.expandJob[mainIndex] = !this.expandJob[mainIndex]
    }

    accept(i , index) {
      let assignData = []
      for(let sub of i) {
        assignData.push({
          name: sub.name,
          assign_id: sub.assign_id,
          movement_id : sub.movement_id
        })
      }
      this._loader.loading('Confirming...')
      this._services.confirmJob(this.userData.key , this.userData.user , assignData)
      .then( res => {
        this._loader.loaded()
        this._alert.basicAlert('JOB - ' + this.waitAcceptJob[index].quote_id , res['text'])
        this.waitAcceptJob = this.waitAcceptJob.splice(index , i)
      })
      .catch( err => {
        this._loader.loaded()
        this._alert.basicAlert('Error' , err.message)
      })
    }

    logout(){
      // this._services.logout()
      this._tab.parent.push(this._services.logout())
    }
}
