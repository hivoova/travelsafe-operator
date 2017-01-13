import { Component } from '@angular/core';
import { NavController , ViewController , NavParams } from 'ionic-angular';
import { GlobalServices } from '../../services';
import { StoreUtil } from '../../utilities/store';
import { LoaderUtil } from '../../utilities/loader';
import { User } from '../../models/user';
import * as moment from 'moment';

interface History {
  name?: string;
  amount?: number;
  buynow?: number;
  date?: string;
}
/*
  Generated class for the BidHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bid-history',
  templateUrl: 'bid-history.html'
})
export class BidHistoryPage {

  paramQuote : any
  paramJobDetail: Array<Array<Object>>
  dateKeys: Array<string>
  movementIds: Array<Array<number>>
  userData: User
  histories: any
  chuckData: Array<any>
  _moment: any

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private _services: GlobalServices,
    private _store: StoreUtil ,
    private _loader: LoaderUtil
    ) {
      this.paramQuote = this.navParams.get('quote_id')
      this.paramJobDetail = this.navParams.get('jobDetail')
      this.dateKeys = []
      this.movementIds = []
      this.chuckData = []
      this._moment = moment
    }

    ionViewWillEnter() {
      this.paramJobDetail.forEach((groups , index)=> {
        this.dateKeys.push(groups[0]['date'])
        var movements = []
        this.paramJobDetail[index].forEach((group , index) => {
         movements.push(group['movement_id'])
        })
        this.movementIds.push(movements)
      })

      this._store.select('userState').subscribe(res => {
        this.userData = res.user
        this._loader.loading('Loading...')
        setTimeout(()=>{
          this._services.getBidHistory(this.userData.key , this.userData.user , this.paramQuote , this.dateKeys , this.movementIds)
          .then((res:any) => {
            try{
              this.histories = res.results
              this.chuckData = this.histories.map((history , index) => {
                return history.map((groupData , index) => {
                  return groupData.reduce((prev , curr) => {
                    curr.amount = prev.amount + curr.amount
                    return curr
                  })
                })
              })
              // console.log(this.chuckData)
              this._loader.loaded()
            }catch(err) {
              console.log(err.message)
            }
            
          })
          .catch(err => {
            this._loader.loaded()
          })
        },1000)
      })
    }

    back(){
      this.viewCtrl.dismiss()
    }

  

}
