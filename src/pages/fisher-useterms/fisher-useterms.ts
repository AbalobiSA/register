import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherPersonalPage} from "../fisher-personal/fisher-personal";

//Imported services
import{FisherService} from "../../providers/FisherService";

//Imported non-page classes
import {FisherUsetermsClass} from "../../classes/fisher-useterms_class";

@IonicPage()
@Component({
  selector: 'page-fisher-useterms',
  templateUrl: 'fisher-useterms.html',
})
export class FisherUsetermsPage {

        terms_status    : FisherUsetermsClass = new FisherUsetermsClass ();

        constructor(public navCtrl: NavController, public navParams: NavParams , public fisherService : FisherService) {
        }

        ionViewDidLoad() {
              console.log('ionViewDidLoad FisherUsetermsPage');
        }



        onFisherFinishTerms(){
            if(this.isTermsResponseValid()) {
                this.fisherService.fisherUpdateTerms(this.terms_status)
                this.navCtrl.push(FisherPersonalPage);
            }
            else{
                console.log("You must accept the Terms Of Use");
            }
        }

        isTermsResponseValid(): boolean {
            return(this.terms_status.terms_use_agreed);
        }

}
