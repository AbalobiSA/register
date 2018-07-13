import {Injectable} from "@angular/core";
import {HttpClient,HttpParams} from "@angular/common/http";

//Imported non-page classes
import {Registree}              from "../classes/registree_class";
import{FisherUsetermsClass}     from "../classes/fisher-useterms_class";
import {PersonalInfoClass}      from "../classes/personal_info_class";
import {CommunityInfoClass}     from "../classes/community_info_class";

import{Fisher} from "../classes/fisher-class";
import {Secrets} from "../classes/secrets";


@Injectable()
export class FisherService {

    secrets:Secrets = new Secrets();


    constructor(private http: HttpClient, public registree: Registree ) {

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
        this.registree.custom_community         = community_info.custom_community;
        this.registree.comm_not_listed          = community_info.comm_not_listed;
        this.registree.IRP_selected             = community_info.comm_IRP_chosen;
        this.registree.commercial_selected      = community_info.comm_commercial_chosen;
        this.registree.recreational_selected    = community_info.comm_recreational_chosen;
        this.registree.other_seleted            = community_info.comm_other_chosen;
  }



    //Build the fisher object
   fisherBuild() : Fisher{
        let fisher = new Fisher();
        this.parseFisher(fisher);
        console.log("Service says 'This fisher has been created'");
        console.log(fisher);
        return fisher;
    }//end SubmitRegistration


    //parse fisher data to a format congruent to what the backend expects
    parseFisher(fisher: Fisher)  {

        fisher.name                             =   this.registree.firstname;
        fisher.surname                          =   this.registree.surname;
        fisher.nickname                         =   this.registree.nickname;
        fisher.password                         =   this.registree.password;
        fisher.cell                             =   this.registree.cellNo;
        fisher.gender                           =   this.registree.gender;
        fisher.id                               =   this.registree.IDnum;
        fisher.usertype                         =   this.registree.role;
        fisher.landingsite                      =   this.registree.community;
        fisher.landingsite_custom               =   this.registree.custom_community;
        fisher.fisher_license_irp               =   this.registree.IRP_selected;
        fisher.fisher_license_recreational      =   this.registree.recreational_selected;
        fisher.permission_local_implementer     =   this.registree.assistant_agreed;
        fisher.permission_daff                  =   this.registree.DAFF_agreed;

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
      this.registree.custom_community      = "";
      this.registree.comm_not_listed       =false;
      this.registree.IRP_selected          =false;
      this.registree.commercial_selected   =false;
      this.registree.recreational_selected =false;
      this.registree.other_seleted         =false;

      //console.log("........Fisher Service Cleared User Details........");
  }

  //Check if fisher with the proposed ID doesn't exist already
  checkIfFisherAlreadyExists(ID: string): Promise<any> {

      return new Promise((resolve, reject) => {
              this.http.get(this.secrets.fisherCheckUserIDurl + ID).toPromise()
                  .then(() => {
                      reject();
                  })
                  .catch(() => {
                      resolve();
                  })
      })
  }


  //Go ahead and actually try to register the fisher
  registerFisher(fisher): Promise<any> {
        //console.log("Posting fisher registration")
      return this.http.post(this.secrets.fisherAddUserURL, fisher).toPromise();
  }

}//end class
