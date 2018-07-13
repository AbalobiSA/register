import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-fisher-register-failure',
  templateUrl: 'fisher-register-failure.html',
})



export class FisherRegisterFailurePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FisherRegisterFailurePage');
  }


    onbackToHome(){
        this.navCtrl.push(HomePage);
    }
}
