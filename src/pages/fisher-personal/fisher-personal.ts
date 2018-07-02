import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from "@angular/forms";

//Imported page classes
import {FisherCommunityPage}  from "../fisher-community/fisher-community";

//Imported services
import{FisherService}         from "../../providers/FisherService";

//Imported non-page classes
import {PersonalInfoClass}    from "../../classes/personal_info_class";



//Function to check for matching passwords
function goodPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        //Passwords mismatch
        if (password.value !== confirmPassword.value) {//passwords do not match
            return {
                mismatchedPasswords: true
            };
        }

        //Passwords match, perform further checks
        else{
            //passwords too short
            if (password.value.length < 6) {
                return {
                    badPasswords: true
                };
            }

            //passwords have sufficient length,check representation of each of CAPS,small letters,---These password requirements have been shelved for now
            /*else{

                if(!hasUpperCase(password.value)){//discovered that there are no CAPS in password
                    return {
                        noUpperCase: true
                    };
                }

                else if(!hasLowerCase(password.value)){
                    return {
                        noLowerCase: true
                    };
                }

                else if(!hasNum(password.value)){
                    return {
                        noNum: true
                    };
                }


            }*/

        }
    }
}


function hasUpperCase(password: string): boolean {//check if the given string has at least one Uppercase Letter
    if(password.length < 1){//safety check string is not empty
        return false;
    }

    else{
            for(let i = 0;i<password.length;i++){
                let char = password.charAt(i);
                if(/[A-Z]/.test(char)){
                    return true;
                }
            }
        return false;
    }
}

function hasLowerCase(password: string): boolean {//return true if a Lowercase has been found
    if(password.length < 1){//safety check string is not empty
        return false;
    }

    else {
        for (let i = 0; i < password.length; i++) {
            let char = password.charAt(i);
            if(/[a-z]/.test(char)){
                return true;
            }
        }
        return false;
    }
}

function hasNum(password: string): boolean {//return true if a digit has been found
    if(password.length < 1){//safety check string is not empty
        return false;
    }

    else {
        for (let i = 0; i < password.length; i++) {
            let char = password.charAt(i);
            if(/^\d+$/.test(char)){
                return true;
            }
        }
        return false;
    }
}




@IonicPage()
@Component({
      selector: 'page-fisher-personal',
      templateUrl: 'fisher-personal.html',
})
export class FisherPersonalPage {

        personal_info : PersonalInfoClass = new PersonalInfoClass();
        public personalForm: any;
        validation_messages = {
            'surname': [
                {type: 'required', message: 'Surname is required.'}
            ],

            'name': [
                {type: 'required', message: 'Name is required.'}
            ],

            'nickname': [
                {type: 'required', message: 'Nickame is required.'}
            ],

            'gender': [
                {type: 'required', message: 'Gender is required.'}
            ],

            'ID': [
                {type: 'required',  message: 'ID is required.'},
                {type: 'minlength', message: 'ID number too short.'},
                {type: 'minLength', message: 'ID number too short.'},
                {type: 'maxlength', message: 'ID number too long.'},
                {type: 'maxLength', message: 'ID number too long.'},
                {type: 'pattern',   message: 'Unacceptable symbols in ID.'}
            ],

            'cell': [
                {type: 'required',  message: 'Cell Number is required.'},
                {type: 'minlength', message: 'Cell Number too short.'},
                {type: 'minLength', message: 'Cell Number too short.'},
                {type: 'maxlength', message: 'Cell Number too long.'},
                {type: 'maxLength', message: 'Cell Number too long.'},
                {type: 'pattern',   message: 'Unacceptable symbols in Cell Number.'}
            ],


            'password1': [
                {type: 'required', message: 'Password is required.'},
            ],

            'password2': [
                {type: 'required', message: 'Password confirmation required.'},
            ]}

            constructor (public navCtrl: NavController, public navParams: NavParams, public fisherService : FisherService, public formBuilder: FormBuilder) {

                    this.personalForm = this.formBuilder.group({
                        "surname":  ['', Validators.required],
                        "name":     ['', Validators.required],
                        "nickname": ['', Validators.required],
                        "gender":   ['', Validators.required],
                        "ID":       ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(13), Validators.maxLength(13)])],
                        "cell":     ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)])],
                        "password1":['', Validators.required],
                        "password2":['', Validators.required]
                    } , {validator: goodPasswords('password1', 'password2')})
            }


            ionViewDidLoad() {
                        console.log('ionViewDidLoad FisherPersonalPage');
            }

            onFisherFinishPersonal(){
                        this.fisherService.fisherUpdatePersonal(this.personal_info);
                        this.navCtrl.push(FisherCommunityPage, this.personal_info);
            }

            surnameChanged(){
                    this.personal_info.personal_surname = this.personalForm.get("surname").value;
            }

            nameChanged(){
                    this.personal_info.personal_firstname = this.personalForm.get("name").value;
            }

            nickNameChanged(){
                    this.personal_info.personal_nickname = this.personalForm.get("nickname").value;
            }

            genderChanged(){
                    this.personal_info.personal_gender = this.personalForm.get("gender").value;
            }

            IDchanged(){
                    this.personal_info.personal_IDnum = this.personalForm.get("ID").value;
            }

            cellChanged(){
                    this.personal_info.personal_cellNo= this.personalForm.get("cell").value;
            }

            password1Changed(){
                    this.personal_info.personal_password1= this.personalForm.get("password1").value;
            }


            password2Changed(){
                    this.personal_info.personal_password2= this.personalForm.get("password2").value;
            }

}//end class
