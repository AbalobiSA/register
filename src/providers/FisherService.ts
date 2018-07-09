import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

//Imported non-page classes
import {Registree}              from "../classes/registree_class";
import{FisherUsetermsClass}     from "../classes/fisher-useterms_class";
import {PersonalInfoClass}      from "../classes/personal_info_class";
import {CommunityInfoClass}     from "../classes/community_info_class";

@Injectable()
export class FisherService {


    REGISTRATION_URL = "";//place a postbin url here first, then replace with actual, then do secret file
    CHECK_USER_URL = "";//place a postbin url here first, then replace with actual, then do secret file


    constructor(private http: HttpClient, public registree: Registree) {

  }

  fisherUpdateRole(role_info     : string) {
        this.registree.role = role_info;
  }

  fisherUpdateTerms(terms_status  : FisherUsetermsClass){
        this.registree.terms_agreed       = terms_status.terms_use_agreed;
        this.registree.assistant_agreed   = terms_status.terms_assistant_agreed;
        this.registree.DAFF_agreed        = terms_status.terms_DAFF_agreed;
  }

  fisherUpdatePersonal(personal_info : PersonalInfoClass){

        this.registree.surname    = personal_info.personal_surname;
        this.registree.firstname  = personal_info.personal_firstname;
        this.registree.nickname   = personal_info.personal_nickname;
        this.registree.gender     = personal_info.personal_gender;
        this.registree.IDnum      = personal_info.personal_IDnum;
        this.registree.cellNo     = personal_info.personal_cellNo;
        this.registree.password   = personal_info.personal_password1;//only use one copy of the 2 identical passwords

  }


  fisherUpdateCommunity(community_info: CommunityInfoClass){
        this.registree.province                 = community_info.comm_province;
        this.registree.community                = community_info.comm_community;
        this.registree.comm_not_listed          = community_info.comm_not_listed;
        this.registree.IRP_selected             = community_info.comm_IRP_chosen;
        this.registree.commercial_selected      = community_info.comm_commercial_chosen;
        this.registree.recreational_selected    = community_info.comm_recreational_chosen;
        this.registree.other_seleted            = community_info.comm_other_chosen;
  }



    //Attempt to register the fisher
    fisherSubmitRegistration(){
        let fisher = this.parseFisher();//user object to be posted
        console.log ("This fisher has been created");
        console.log (fisher);

    }


    //parse fisher data to a format congruent to what the backend expects
    parseFisher(): Object {

   let parsedFisher = {
        //Fields currently populated
        "name"                          : this.registree.firstname,
        "surname"                       : this.registree.surname,
        "nickname"                      : this.registree.nickname,
        "password"                      : this.registree.password,
        "cell"                          : this.registree.cellNo,
        "gender"                        : this.registree.gender,
        "id"                            : this.registree.IDnum,
        "usertype"                      : this.registree.role,
        "landingsite"                   : this.registree.community,
        "fisher_license_irp"            : this.registree.IRP_selected,
        "fisher_license_recreational"   : this.registree.recreational_selected,
        "permission_local_implementer"  : this.registree.assistant_agreed,
        "permission_daff"               : this.registree.DAFF_agreed,
        "preferred_language"            : "English",//is this okay?


        //Unpopulated fieilds
       // "permission_local_implementer": true,
       /* "__query_params": {},
        //"fisher_license_irp": true,
        "boat_engine_hp": 450,
        "fisher_boat_type": "Bakkie",
        "device_version": "4.4.2",
        "device_uuid": "42a469ece0aef206",
        "birth_date": "2009-07-06T00:00:00.000Z",
        "boat_name": "Jjjjj",
        "boat_reg": "55555",
        //"preferred_language": "English",
        "device_model": "GT-I9190",
        //"gender": "male",
        "email": "tt@test.com",
        "boat_own": true,
        "boat_expDate": "2020-07-06T00:00:00.000Z",
        "fisher_boat": true,
        "community_not_specified": true,
        //"password": "abbababa",
        //"surname": "Test surname",
        //"name": "Joshua",
        "filter": "abalobi_registration",
        //"usertype": "fisher",
        "uuid_timestamp": "2018-07-06T14:37:30.684Z",
        "device_manufacturer": "samsung",
        "boat_has_engine": true,
        "fisher_shore": true,
        "device_platform": "Android",
        //"permission_daff": true,
        "boat_engine_cc": 45,
        //"nickname": "Tatenda",
        //"fisher_license_recreational": false,
        //"cell": "0123456789",
        "app_version": "0.5.5",
        //"id": "1234567890123",
        "fisher_licence_irp_number": "Haai",
        "email_is_my_own": true,
        "landingsite_custom": "testcom",
        "device_serial": "002ff2ed"*/
    }//end method parseUser

    return parsedFisher;//return the user in a format ready for posting

}



  //Clear the recently entered fisher info
  fisherClearDetails(){
        //Reset the registree fields after attempted registration
      //Role details
      this.registree.role  = "";

      //Terms of use details
      this.registree.terms_agreed      =false;
      this.registree.assistant_agreed  =false;
      this.registree.DAFF_agreed       =false;

      //Personal details
      this.registree.surname    = "";
      this.registree.firstname  = "";
      this.registree.nickname   = "";
      this.registree.gender     = "";
      this.registree.IDnum      = "";
      this.registree.cellNo     = "";
      this.registree.password   = "";

      //Community details
      this.registree.province              ="";
      this.registree.community             ="";
      this.registree.comm_not_listed       =false;
      this.registree.IRP_selected          =false;
      this.registree.commercial_selected   =false;
      this.registree.recreational_selected =false;
      this.registree.other_seleted         =false;

      console.log("........Fisher Service Cleared User Details........");
  }

  //Check if fisher with th proposed username doesnt exist already
  checkIfFisherAlreadyExists(ID: string): Promise<any> {
        return this.http.get(this.CHECK_USER_URL + ID).toPromise();
  }

  //Go ahead and actually try to register the fisher
  registerFisher(fisher): Promise<any> {
        return this.http.post(this. REGISTRATION_URL, fisher).toPromise();
  }


}//end class
