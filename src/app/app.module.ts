//Modules
import {HttpClientModule}       from "@angular/common/http";
import {RecaptchaModule}        from "ng-recaptcha";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Development
import { MyApp }                from './app.component';
//Common landing page
import { HomePage }               from '../pages/home/home';
//Fisher registration pages
import { FisherCommunityPage }    from '../pages/fisher-community/fisher-community';
import { FisherConfirmPage }      from '../pages/fisher-confirm/fisher-confirm';
import { FisherPersonalPage }     from '../pages/fisher-personal/fisher-personal';
import { FisherRolePage }         from '../pages/fisher-role/fisher-role';
import { FisherUsetermsPage }     from '../pages/fisher-useterms/fisher-useterms';
import{FisherRegisterSuccessPage}  from "../pages/fisher-register-success/fisher-register-success";
import{FisherNotUniquePage}        from "../pages/fisher-not-unique/fisher-not-unique";
import {FisherRegisterFailurePage} from "../pages/fisher-register-failure/fisher-register-failure";
//Marketplace registration pages
import { MarketplaceHome }      from '../pages/marketplace-home/marketplace-home';

//Imported services
import {MarketplaceService}     from "../providers/MarketplaceService";
import{FisherService}           from "../providers/FisherService";
import{Registree}               from "../classes/registree_class";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FisherCommunityPage,
    FisherConfirmPage,
    FisherPersonalPage,
    FisherRolePage,
    FisherUsetermsPage,
      FisherRegisterSuccessPage,
      FisherNotUniquePage,
      FisherRegisterFailurePage,
    MarketplaceHome
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    RecaptchaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FisherCommunityPage,
    FisherConfirmPage,
    FisherPersonalPage,
    FisherRolePage,
    FisherUsetermsPage,
      FisherRegisterSuccessPage,
      FisherNotUniquePage,
      FisherRegisterFailurePage,
    MarketplaceHome
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MarketplaceService,
    FisherService,
    Registree,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
