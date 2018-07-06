import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

//Imported non-page classes
import {Registree}              from "../classes/registree_class";
import{FisherUsetermsClass}     from "../classes/fisher-useterms_class";
import {PersonalInfoClass}      from "../classes/personal_info_class";
import {CommunityInfoClass}     from "../classes/community_info_class";

@Injectable()
export class FisherService {

    POSTBIN_URL = "hhhh";

  // SERVER_URL = "http://localhost:1337";
  //SERVER_URL = "http://169.239.183.156:1337";

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


  //Submit the registree for registration, check if the registration doesn't exist already
  fisherSubmitRegistration(){

        console.log("Fisher Service Printing Entered Data !!");
        console.log(this.registree);


        //Reset the registree fields after attempted registration
      //Role details
     /* this.registree.role  = "";

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
*/
  }

  //Check if user with th proposed username doesnt exist already
  checkIfFisherAlreadyExists(username: string): Promise<any> {
        return this.http.get(this.POSTBIN_URL + "/api/users/find/?username=" + username).toPromise();
  }

  //Go ahead and actually try to register the user
  registerFisher(user): Promise<any> {
        return this.http.post(this.POSTBIN_URL + "/api/users/create/", user).toPromise();
  }


}//end class
