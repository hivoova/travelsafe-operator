import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the JobList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html'
})
export class JobListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello JobListPage Page');
  }

}
