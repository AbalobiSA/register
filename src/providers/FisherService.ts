import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

//Imported non-page classes
import {Registree}              from "../classes/registree_class";
import{FisherUsetermsClass}     from "../classes/fisher-useterms_class";
import {PersonalInfoClass}      from "../classes/personal_info_class";
import {CommunityInfoClass}     from "../classes/community_info_class";

@Injectable()
export class FisherService {

  // SERVER_URL = "http://localhost:1337";
  //SERVER_URL = "http://169.239.183.156:1337";

  constructor(private http: HttpClient, public registree: Registree) {

  }

  //all these functions must return a promise to attempt to update the info
  fisherUpdateRole(role_info     : string) {
        this.registree.role = role_info;
        //update the registree in storage;--return a promise
        console.log("Fisher Service successfully updates role");
  }

  fisherUpdateTerms(terms_status  : FisherUsetermsClass){
        this.registree.terms_agreed       = terms_status.terms_use_agreed;
        this.registree.assistant_agreed   = terms_status.terms_assistant_agreed;
        this.registree.DAFF_agreed        = terms_status.terms_DAFF_agreed;
        //update the registree in storage;
        console.log("Fisher Service successfully updates terms of use");
  }

  fisherUpdatePersonal(personal_info : PersonalInfoClass){
        this.registree.surname    = personal_info.personal_surname;
        this.registree.firstname  = personal_info.personal_firstname;
        this.registree.nickname   = personal_info.personal_nickname;
        this.registree.gender     = personal_info.personal_gender;
        this.registree.IDnum      = personal_info.personal_IDnum;
        this.registree.cellNo     = personal_info.personal_cellNo;
        this.registree.password   = personal_info.personal_password1;//only use one copy of the 2 identical passwords
        //update the registree in storage;
        console.log("Fisher Service successfully updates personal info");

  }


  fisherUpdateCommunity(community_info: CommunityInfoClass){
        this.registree.province                 = community_info.comm_province;
        this.registree.comm_not_listed          = community_info.comm_not_listed;
        this.registree.IRP_selected             = community_info.comm_IRP_chosen;
        this.registree.commercial_selected      = community_info.comm_commercial_chosen;
        this.registree.recreational_selected    = community_info.comm_recreational_chosen;
        //update the registree in storage;
        console.log("Fisher Service successfully updates community info");
  }


  //Submit the registree for registration, check if the registration doesn't exist already
  fisherSubmitRegistration(){
        console.log("Fisher Service Printing Entered Data !!");
        console.log(this.registree);

  }


}//end class
