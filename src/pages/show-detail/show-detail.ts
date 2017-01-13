import { Component } from '@angular/core';
import { NavController , NavParams , ViewController } from 'ionic-angular';
import { GlobalServices } from '../../services';
import { LoaderUtil } from '../../utilities/loader';
import { StoreUtil } from '../../utilities/store';
import { User } from '../../models/user';
import { JobDetail , AcceptRequest } from '../../models/job';
import { AlertUtil } from '../../utilities/alert';
import { ModalUtil } from '../../utilities/modal';
import * as moment from 'moment';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { BidHistoryPage } from '../bid-history/bid-history';

interface BuyNow {
  price? :number
}

/*
  Generated class for the ShowDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-detail',
  templateUrl: 'show-detail.html'
})
export class ShowDetailPage {

  userData: User
  settings: Object
  jobDetail: Array<Array<JobDetail>>
  paramsQuote: number
  acceptRequest: AcceptRequest
  bidForm : Array<FormGroup>
  buyNowPrice: Array<BuyNow>
  submitAttempt: Array<boolean>

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private _services: GlobalServices,
    private _store: StoreUtil,
    private _loader: LoaderUtil,
    private _alert: AlertUtil,
    private _fb: FormBuilder,
    private _modal: ModalUtil ,
    private _view: ViewController
    ) {
      this.paramsQuote = navParams.get('quote_id')
      this.bidForm = []
      this.buyNowPrice = []
      this.submitAttempt = []
    }

  ionViewWillEnter () {
    this._store.select('userState').subscribe(res => {
      this.userData = res.user
      this._loader.loading('Loading...')
      setTimeout(()=>{
        this._services.getJobDetail(this.userData.key , this.userData.user , this.paramsQuote)
        .then(res => {
          if(res) {
            this.jobDetail = res['results']
            for(let i of this.jobDetail) {
              var sum_buy_price = 0
              this.bidForm.push(
                this._fb.group({
                  price: ['' , Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
                  notes: ''
                })
              )
              for(let j of i) {
                sum_buy_price += j.buy_now_price
              }
              this.buyNowPrice.push({price: sum_buy_price})
            }
          }
          this._loader.loaded()
        })
        .catch(err => {
          this._loader.loaded()
          this._alert.basicAlert('Job Detail' , err.message)
        })
      },1000)
    })

    this._store.select('settingState').subscribe(res => {
      this.settings = res.setting
    })
  }


  submit(dateKey , i , buynow = 0) {
    if(buynow == 0) {
      this.submitAttempt[i] = true
      if(!this.bidForm[i].valid) return false
    }else{
      this.submitAttempt[i] = false
    }
    var price = buynow || this.bidForm[i].controls['price'].value || 0
    var notes = this.bidForm[i].controls['notes'].value || ""
    var movementIds = []
    this.jobDetail.forEach((groups , index)=>{
      this.jobDetail[index].forEach((group, index)=>{
        if(moment(group.date , 'DD MMM YYYY HH:mm:ss').isSame(moment(dateKey , 'DD MMM YYYY HH:mm:ss'))){
          movementIds.push(group.movement_id)
        }
      })
    })
    this.acceptRequest = {
      _price: price,
      _notes: notes,
      _quoteId: this.paramsQuote,
      _dateKey: dateKey ,
      _movementIds: movementIds ,
      _buynow: (buynow > 0) ? 'buy now' : ''
    }
    this._loader.loading('Bidding...')
    this._services.acceptJob(this.userData.key , this.userData.user , this.acceptRequest)
    .then(res => {
      this._alert.basicAlert('JOB - ' + this.paramsQuote , res['text'])
      this._loader.loaded()
      this.back({status: 1 , title: 'Bid' , buynow: buynow})
    })
    .catch(err => {
      this._loader.loaded()
      this._alert.basicAlert('Connection' , err.message)
      this.back({status: 0, title: 'Bid'})
    })
    
  }

  reject(dateKey) {
    this._alert.confirmAlert('Bid Reject' , 'Are you confirm to reject this job?')
    .then(res => {
      var movementIds = []
      this.jobDetail.forEach((groups , index)=>{
        this.jobDetail[index].forEach((group, index)=>{
          if(moment(group.date , 'DD MMM YYYY HH:mm:ss').isSame(moment(dateKey , 'DD MMM YYYY HH:mm:ss'))){
            movementIds.push(group.movement_id)
          }
        })
      })
      this._loader.loading('Rejecting...')
      this._services.reject(this.userData.key , this.userData.user , this.paramsQuote , dateKey , movementIds)
      .then(res => {
        this._alert.basicAlert('JOB - ' + this.paramsQuote, res['text'])
        this._loader.loaded()
        this.back({status: 1 , title: 'Reject'})
      })
      .catch(err => {
        this._loader.loaded()
        this._alert.basicAlert('Connection' , err.message)
        this.back({status: 0 , title: 'Reject'})
      })
    })
  }

  back(param:any) {
    this._view.dismiss(param)
  }

  showHistory() {
    this._modal.create(BidHistoryPage , {"quote_id": this.paramsQuote , "jobDetail" : this.jobDetail})
    this._modal.present()
  }
  

}
