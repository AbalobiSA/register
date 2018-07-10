import { Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { MarketplaceHome }      from '../marketplace-home/marketplace-home';
import {FisherRolePage} from "../fisher-role/fisher-role";
//import {Device} from "@ionic-native/device";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    //device:Device = new Device();

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController) {

        //document.addEventListener("deviceready", this.onDeviceReady(this.device), false);


    }

    onSelectFisherRegistration(){
        this.navCtrl.push(FisherRolePage);
    }

    onSelectMarketplaceRegistration(){
        this.navCtrl.push(MarketplaceHome);
    }




    /*onDeviceReady(device: Device) {//leave for later
        console.log(this.device.cordova);
        console.log(this.device.manufacturer);
        console.log(this.device.model);
        console.log(this.device.platform);
        console.log(this.device.version);
        console.log(this.device.uuid);
        console.log(this.device.serial);
    }*/






}//end class homepage
