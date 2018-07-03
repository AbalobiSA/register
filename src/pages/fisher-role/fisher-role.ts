import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FisherUsetermsPage} from "../fisher-useterms/fisher-useterms";

//Imported service
import{FisherService} from "../../providers/FisherService";


@IonicPage()
@Component({
  selector: 'page-fisher-role',
  templateUrl: 'fisher-role.html',
})
export class FisherRolePage {


        role   : string;

        constructor(public navCtrl: NavController, public navParams: NavParams, public fisherService: FisherService) {

        }

        ionViewDidLoad() {
                  console.log('ionViewDidLoad FisherRolePage');
        }

        nextFromFisherRole(){
                if(this.isFisherRoleValid()) {
                        this.fisherService.fisherUpdateRole(this.role);
                        this.navCtrl.push(FisherUsetermsPage);
                }
                else{
                    console.log("Role is required ");
                }
        }


        isFisherRoleValid(): boolean {
            return((this.role == "Fisher")||(this.role == "Fisher Assistant"));
        }


}
