import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

//Imported services
import{FisherService} from "../../providers/FisherService";
import {PersonalInfoClass} from "../../classes/personal_info_class";
import{Fisher} from "../../classes/fisher-class";
import {FisherRegisterSuccessPage} from "../fisher-register-success/fisher-register-success";
import {FisherNotUniquePage} from "../fisher-not-unique/fisher-not-unique";
import {FisherRegisterFailurePage} from "../fisher-register-failure/fisher-register-failure";


@IonicPage()
    @Component({
              selector: 'page-fisher-confirm',
              templateUrl: 'fisher-confirm.html',
    })


    export class FisherConfirmPage {
    //user details are propagated from personal details page through the community page to this final page
    //passed as navParams upon opening a new page
    public confirm_info: PersonalInfoClass = new PersonalInfoClass();
    fisher: Fisher;


    constructor( public loadingCtrl: LoadingController, public navParams: NavParams, public fisherService: FisherService,public navController: NavController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FisherConfirmPage');
        this.confirm_info.personal_surname      = this.navParams.get('surname');
        this.confirm_info.personal_firstname    = this.navParams.get('firstname');
        this.confirm_info.personal_IDnum        = this.navParams.get('IDnum');
        this.confirm_info.personal_cellNo       = this.navParams.get('cellNo');
    }

    onFisherSubmit() {

        //TODO - consider improving such that the pages persists the data in storage so user can come back and edit
        // TODO - currently, if registration fails, user has to start all over again

        //TODO - The loading controller works perfect but the the spinner is not showing
        let reg = this.loadingCtrl.create({
                spinner             : 'Show iOS',
                content             : 'Registration in progress..',
                dismissOnPageChange : true,
                showBackdrop        : true

        });

        reg.present();

        this.fisher = this.fisherService.fisherBuild();

        this.fisherService.checkIfFisherAlreadyExists(this.fisher.id)//first promise check if the ID number has already been taken
           .then(()=>{//ID is unique
               //Go ahead and attempt to register unique fisher
               //alert('ID number is unique');
               this.fisherService.registerFisher(this.fisher)//attempts to register user
                   .then (()=> {

                       //alert('User registration successful');
                       this.navController.push(FisherRegisterSuccessPage);
                   })
                   .catch( ()=>{//failure to register , but ID is unique
                       //alert('User registration failed');
                       this.navController.push(FisherRegisterFailurePage);

                   })
           })
            .catch(()=>{//ID number already taken
                //.alert('ID number already exists');
                this.navController.push(FisherNotUniquePage);
            })
    }//end method onFisherSubmit

}//end class