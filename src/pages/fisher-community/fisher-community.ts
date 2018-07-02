import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherConfirmPage} from "../fisher-confirm/fisher-confirm";

//Imported services
import {FisherService} from "../../providers/FisherService";

//Imported non-page classes
import{CommunityInfoClass} from "../../classes/community_info_class";

@IonicPage()
@Component({
        selector: 'page-fisher-community',
        templateUrl: 'fisher-community.html',
})
export class FisherCommunityPage {

      community_info   : CommunityInfoClass = new CommunityInfoClass();
      confirm_personal : Object = new Object();

      constructor(public navCtrl: NavController, public navParams: NavParams, public  fisherService   : FisherService) {

      }

      ionViewDidLoad() {

                console.log("ionViewDidLoad FisherCommunityPage") ;

                //package the info needed by the confirmation page for propagation ahead to the register page
                this.confirm_personal = {
                    surname     : <string> this.navParams.get('personal_surname'),
                    firstname   : <string> this.navParams.get('personal_firstname'),
                    IDnum       : <string> this.navParams.get('personal_IDnum'),
                    cellNo      : <string> this.navParams.get('personal_cellNo'),
        };
      }

       onFisherFinishCommunity()   {
        //TODO
        //introduce promise here
        this.fisherService.fisherUpdateCommunity(this.community_info);
        this.navCtrl.push(FisherConfirmPage,this.confirm_personal);

      }
}//end class
