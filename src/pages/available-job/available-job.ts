import { Component , NgZone } from '@angular/core';
import { NavController , Tabs } from 'ionic-angular';
import { GlobalServices } from '../../services';
import { AvailableJob } from '../../models/job';
import { User } from '../../models/user';
import { LoaderUtil } from '../../utilities/loader';
import { StoreUtil } from '../../utilities/store';
import { AlertUtil } from '../../utilities/alert';
import { ModalUtil } from '../../utilities/modal';
import { JobAction } from '../../actions/job'
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { ShowDetailPage } from '../show-detail/show-detail'
/*
  Generated class for the AvailableJob page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-available-job',
  templateUrl: 'available-job.html'
})
export class AvailableJobPage {

  userData: User
  _moment: any
  jobAvailables: Array<AvailableJob>
  lastUpdated: string
  countNewJob: number
  subScription: Subscription
  timer: any

  constructor(
    public navCtrl: NavController ,
    private _services: GlobalServices,
    private _loader: LoaderUtil ,
    private _store: StoreUtil ,
    private _alert: AlertUtil ,
    private _modal: ModalUtil ,
    private _jobAction : JobAction ,
    private _ngZone: NgZone ,
    private _tab: Tabs
    ) {
      this.jobAvailables = []
      this._moment = moment

      this.userData = {
        key: '' ,
        user: 0
      }
      this.timer = null
      this.countNewJob = 0
    }

  ionViewWillEnter () {
    
    this.subScription = this._store.select('userState').subscribe(res => {
      this.userData = res.user
      this._loader.loading('Loading...')
      setTimeout(()=> {
        this.loadList()
      }, 1000)
    })
    this.subScription.unsubscribe()
    this.timer = setInterval(()=>{
      if(this.jobAvailables.length > 0){
        this._store.select('jobState')
        .subscribe(
          res => {
            if(this.countNewJob == 0) this.countNewJob = res.newAvailable
            if(this.countNewJob < res.newAvailable) {
              this._ngZone.runOutsideAngular(()=>{
                this._services.getAvailableJobsNew(this.userData.key , this.userData.user , (res.newAvailable - this.countNewJob))
                .then((res)=>{
                  this._ngZone.run(()=>{
                    if(res) {
                      var oldList = this.jobAvailables
                      var results = res['results']
                      for(let item of results) {
                        if(this.checkAlreadyExistQuoteId(item.quote_id)) {
                          results = results.filter(res => res.quote_id != item.quote_id)
                        }
                      }
                      this.jobAvailables = results
                      this.jobAvailables = this.jobAvailables.concat(oldList)
                    }
                    this.lastUpdated = moment().format('DD MMM YYYY HH:mm')
                  })
                })
                .catch((err)=>{
                  this._ngZone.run(()=>{
                    this._alert.basicAlert('Connection' , err)
                  })
                })
              })
            }
            this.countNewJob = res.newAvailable 
          }
        )
        this.timer = null
      }
    } , 1000)
  }

  checkAlreadyExistQuoteId(quote_id) {
    let check = false
    this.jobAvailables.map((item , index)=>{
      if(item.quote_id == quote_id) check = true
    })
    return check
  }

  loadList(){
    this._services.getAvailableJobs(this.userData.key , this.userData.user)
    .then(res => {
      if(res) {
        this.jobAvailables = res['results']
      }
      this.lastUpdated = moment().format('DD MMM YYYY HH:mm')
      this._loader.loaded()
    })
    .catch(err => {
      this._loader.loaded()
      this._alert.basicAlert('Connection' , err)
    })
  }



  showDetail(quote_id: number , i: number) {
    this.jobAvailables.map((item , index)=>{
        if(index == i) {
          console.log(item.active)
          if(item.active == 0) this._store.dispatch(this._jobAction.decreamentCountAvailable())
          item.active = 1
        }
    })
    this._modal.create(ShowDetailPage , {quote_id:quote_id})
    this._modal.present()
    this._modal.onDismiss((data)=>{
      if(data.title == 'Reject' && data.status == 1) {
        this.jobAvailables = this.jobAvailables.filter(item => item.quote_id !== quote_id)
      }
      if(data.title == 'Bid' && data.status == 1 && data.buynow > 0) {
        this.jobAvailables = this.jobAvailables.filter(item => item.quote_id !== quote_id)
      }
      this._services.activeBid(this.userData.key , this.userData.user , quote_id)
    })
  }

  logout(){
    // this._services.logout()
    this._tab.parent.push(this._services.logout())
  }
}
