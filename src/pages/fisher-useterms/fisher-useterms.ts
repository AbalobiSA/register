import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherPersonalPage} from "../fisher-personal/fisher-personal";

//Imported services
import{FisherService} from "../../providers/FisherService";

//Imported non-page classes
import {FisherUsetermsClass} from "../../classes/fisher-useterms_class";
import {FormBuilder, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-fisher-useterms',
  templateUrl: 'fisher-useterms.html',
})
export class FisherUsetermsPage {

        terms_status    : FisherUsetermsClass = new FisherUsetermsClass ();


    public termsForm: any;

    validation_messages = {
        'agree': [
            {type: 'requiredTrue', message: 'Check "*I Agree" to accept the terms above.'}
        ],
    }



    constructor (public navCtrl: NavController, public navParams: NavParams, public fisherService : FisherService, public formBuilder: FormBuilder) {

        this.termsForm = this.formBuilder.group({
            "agree": ['', Validators.requiredTrue],
        })

        //console.log("The boolean for terms in constructor is");
       // console.log(this.terms_status.terms_use_agreed);

    }

        ionViewDidLoad() {
              console.log('ionViewDidLoad FisherUsetermsPage');

            console.log("The boolean for terms on Load is");
            console.log(this.terms_status.terms_use_agreed);
        }



        onFisherFinishTerms(){
            //if(this.isTermsResponseValid()) {
                this.fisherService.fisherUpdateTerms(this.terms_status)
                this.navCtrl.push(FisherPersonalPage);
           // }
            //else{
                //console.log("You must accept the Terms Of Use");
            //}
        }

        isTermsResponseValid(): boolean {
            return(this.terms_status.terms_use_agreed);
        }

    termsChanged(){

        //console.log("The boolean for terms  on entering termsChanged is");
        //console.log(this.terms_status.terms_use_agreed);

        this.terms_status.terms_use_agreed = this.termsForm.get('agree').value;
        //console.log(this.terms_status.terms_use_agreed);

        //console.log("The boolean for terms  on exiting termsChanged is");
        //console.log(this.terms_status.terms_use_agreed);
    }

}
