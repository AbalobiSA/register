import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherCommunityPage}  from "../fisher-community/fisher-community";

//Imported services
import{FisherService}         from "../../providers/FisherService";

//Imported non-page classes
import {PersonalInfoClass}    from "../../classes/personal_info_class";

import{FormBuilder, FormGroup, Validators} from "@angular/forms";

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
            {type: 'required', message: 'Password is required.'}
        ],

        'password2': [
            {type: 'required', message: 'Password is required.'},

        ],

    }


    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }

    }


      constructor (public navCtrl: NavController, public navParams: NavParams, public fisherService : FisherService, public formBuilder: FormBuilder) {

            this.personalForm = this.formBuilder.group({
                "surname": ['', Validators.required],
                "name": ['', Validators.required],
                "nickname": ['', Validators.required],
                "gender": ['', Validators.required],
                "ID": ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(13), Validators.maxLength(13)])],
                "cell": ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)])],
                "password1": ['', Validators.required],
                "password2": ['', Validators.required],
            //,{validator: this.checkIfMatchingPasswords('password1', 'password2')})
                  })
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

      ionViewDidLoad() {
            console.log('ionViewDidLoad FisherPersonalPage');
      }


      onFisherFinishPersonal(){
              //if(this.isPersonalDetailsValid()) {
                  this.fisherService.fisherUpdatePersonal(this.personal_info);
                  this.navCtrl.push(FisherCommunityPage, this.personal_info);
             // }
              //else{
                    //console.log()"";
              //}
      }




            // validates the user on the client and server side to ensure that they can be registered
            isPersonalDetailsValid (): boolean {


                              //Some of the fields not completed
                              if (!(this.personal_info.personal_surname   && this.personal_info.personal_firstname  && this.personal_info.personal_nickname &&
                                    this.personal_info.personal_gender    && this.personal_info.personal_IDnum      && this.personal_info.personal_cellNo   &&
                                    this.personal_info.personal_password1 && this.personal_info.personal_password2)) {
                                          console.log("Please fill in all the fields");
                                          return false;
                              }

                              else{
                                          // All fields completed but passwords don't match
                                          if(this.personal_info.personal_password1 !== this.personal_info.personal_password2) {
                                                console.log("The passwords you have entered do not match");
                                                return false;
                                          }

                                          // Rudimentarily check that the cell number is valid - this currently does not flag letters in id numbers and phone numbers
                                          else if(!this.isValidPhoneNumber(this.personal_info.personal_cellNo)) {
                                                console.log("Please enter a valid phone number. Phone numbers should contain 10 digits. Only South African numbers are allowed at present. Example: 0821234567");
                                                return false;
                                          }

                                          // Rudimentarily check that the ID number is valid
                                          else if(!this.isValidIDNumber(this.personal_info.personal_IDnum)) {
                                                console.log("Please enter a valid ID number. ID numbers should contain 13 digits.");
                                                return false;
                                          }

                                          //TODO - Finally check that the current user does not already exist - API call

                              }

                              //passed all tests
                              return true;
            }



            isValidPhoneNumber(input): boolean{

                    let phoneno = /^\d{10}$/;
                    if(input.value.match(phoneno)){
                        return true;
                    }
                    else {
                        return false;
                    }
            }


            isValidIDNumber(input): boolean{
                  let IDno = /^\d{13}$/;

                  if(input.value.match(IDno)){
                        return true;
                  }
                  else {
                        return false;
                  }
            }


}//end class
