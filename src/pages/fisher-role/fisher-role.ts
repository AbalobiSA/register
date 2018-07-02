import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FisherUsetermsPage} from "../fisher-useterms/fisher-useterms";

//Imported service
import{FisherService} from "../../providers/FisherService";

//Imported non-page classes
//import{RoleInfoClass} from "../../classes/role_info_class";


@IonicPage()
@Component({
  selector: 'page-fisher-role',
  templateUrl: 'fisher-role.html',
})
export class FisherRolePage {


        role   : string ="";// : RoleInfoClass = new RoleInfoClass ();

        constructor(public navCtrl: NavController, public navParams: NavParams, public fisherService: FisherService) {

        }

        ionViewDidLoad() {
                  console.log('ionViewDidLoad FisherRolePage');
        }

        nextFromFisherRole(){
          //TODO
            //create a promise  here
            //On success
            this.fisherService.fisherUpdateRole(this.role);
            this.navCtrl.push(FisherUsetermsPage);
        }


}
