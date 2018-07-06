import { Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { MarketplaceHome }      from '../marketplace-home/marketplace-home';
import {FisherRolePage} from "../fisher-role/fisher-role";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController) {
    }

    onSelectFisherRegistration(){
        this.navCtrl.push(FisherRolePage);
    }

    onSelectMarketplaceRegistration(){
        this.navCtrl.push(MarketplaceHome);
    }
}//end class homepage
