import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';

import { RegisterPage } from '../pages/register/register'; 
import { ShowMoreJobPage } from '../pages/show-more-job/show-more-job';
import { AvailableJobPage } from '../pages/available-job/available-job';
import { WaitAcceptPage } from '../pages/wait-accept/wait-accept';
import { ShowDetailPage } from '../pages/show-detail/show-detail';
import { BidHistoryPage } from '../pages/bid-history/bid-history';
import { UnregisteredPage } from '../pages/unregistered/unregistered';

import { StoreModule  } from '@ngrx/store';
import * as fromUser from '../reducers/user';
import * as fromJob from '../reducers/job';
import * as fromSetting from '../reducers/setting';
import * as fromRoute from '../reducers/route';

import { LoaderUtil } from '../utilities/loader';
import { AlertUtil } from '../utilities/alert';
import { StorageUtil } from '../utilities/storage';
import { StoreUtil } from '../utilities/store';
import { GlobalServices } from '../services'; 
import { UserAction } from '../actions/user';
import { UserService } from '../services/user';
import { JobService } from '../services/job';
import { JobAction } from '../actions/job';
import { RouteAction } from '../actions/route';
import { SettingService } from '../services/setting';
import { SettingAction } from '../actions/setting';
import { ModalUtil } from '../utilities/modal';

import { RoundPipe } from '../pipes/round';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5e24b95e'
  },
  'push': {
    'sender_id': '478967274505',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    RegisterPage,
    ShowMoreJobPage,
    AvailableJobPage,
    WaitAcceptPage ,
    ShowDetailPage ,
    BidHistoryPage ,
    UnregisteredPage ,
    RoundPipe
  ],
  imports: [
    StoreModule.provideStore({
      userState: fromUser.UserReducer,
      jobState: fromJob.JobReducer,
      settingState: fromSetting.SettingReducer,
      routeState: fromRoute.RouteReducer
    }),
    IonicModule.forRoot(MyApp),
    HttpModule,
    ReactiveFormsModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage, 
    // ContactPage,
    // HomePage,
    // TabsPage,
    RegisterPage,
    ShowMoreJobPage,
    AvailableJobPage,
    WaitAcceptPage,
    ShowDetailPage ,
    BidHistoryPage ,
    UnregisteredPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler} , 
    UserAction , 
    Storage ,
    GlobalServices , 
    UserService,
    LoaderUtil ,
    AlertUtil ,
    StorageUtil ,
    StoreUtil ,
    JobService , 
    RouteAction ,
    SettingService ,
    SettingAction ,
    ModalUtil ,
    JobAction
  ]
})
export class AppModule {}
