import {Component, Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported services
import{FisherService} from "../../providers/FisherService";
import {PersonalInfoClass} from "../../classes/personal_info_class";
import {AfterRegisterPage} from "../after-register/after-register";

@IonicPage()
    @Component({
              selector: 'page-fisher-confirm',
              templateUrl: 'fisher-confirm.html',
    })


    export class FisherConfirmPage {
              //user details are propagated from personal details page through the community page to this final page
              //passed as navParams upon opening a new page
              public confirm_info : PersonalInfoClass = new PersonalInfoClass();

              constructor(public navCtrl: NavController, public navParams: NavParams, public fisherService: FisherService ) {
              }

              ionViewDidLoad() {
                        console.log('ionViewDidLoad FisherConfirmPage');
                        this.confirm_info.personal_surname    = this.navParams.get('surname');
                        this.confirm_info.personal_firstname  = this.navParams.get('firstname');
                        this.confirm_info.personal_IDnum      = this.navParams.get('IDnum');
                        this.confirm_info.personal_cellNo     = this.navParams.get('cellNo');
              }

              onFisherSubmit(){
                        this.fisherService.fisherSubmitRegistration();
                        this.navCtrl.push(AfterRegisterPage);//navigate to blank page after registration attemp, whether successful or not
              }

    }//end class
