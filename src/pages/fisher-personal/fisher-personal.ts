import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherCommunityPage}  from "../fisher-community/fisher-community";

//Imported services
import{FisherService}         from "../../providers/FisherService";

//Imported non-page classes
import {PersonalInfoClass}    from "../../classes/personal_info_class";

@IonicPage()
@Component({
      selector: 'page-fisher-personal',
      templateUrl: 'fisher-personal.html',
})
export class FisherPersonalPage {

      personal_info : PersonalInfoClass = new PersonalInfoClass();

      constructor(public navCtrl: NavController, public navParams: NavParams, public fisherService : FisherService) {
      }

      ionViewDidLoad() {
            console.log('ionViewDidLoad FisherPersonalPage');
      }


      onFisherFinishPersonal(){
              //TODO
              //introduce promise here
              this.fisherService.fisherUpdatePersonal(this.personal_info);
              this.navCtrl.push(FisherCommunityPage,this.personal_info);
      }



}//end class
