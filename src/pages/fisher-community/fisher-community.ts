import {Component, Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Imported page classes
import {FisherConfirmPage} from "../fisher-confirm/fisher-confirm";

//Imported services
import {FisherService} from "../../providers/FisherService";

//Imported non-page classes
import{CommunityInfoClass} from "../../classes/community_info_class";
import {CommunityClass} from "../../classes/community_class";

@IonicPage()
@Component({
        selector: 'page-fisher-community',
        templateUrl: 'fisher-community.html',
})
export class FisherCommunityPage {

        all_comms        : CommunityClass[] = [];
        community_info   : CommunityInfoClass = new CommunityInfoClass();
        confirm_personal : Object = new Object();

        constructor(public navCtrl: NavController, public navParams: NavParams, public  fisherService   : FisherService) {

            //construct the list of all communities upon and instantiate once
            for (let i = 1;i <this.list_of_communities.length;i++){//ignore headings, start at second line
                let line :string []= (this.list_of_communities[i]).split(",");
                this.all_comms.push(new CommunityClass(line[0],line[1],line[2]));
            }


        }

      ionViewDidLoad() {

                console.log("ionViewDidLoad FisherCommunityPage") ;

                //package the info needed by the confirmation page for propagation ahead to the register page
                this.confirm_personal = {
                    surname     : <string> this.navParams.get('personal_surname'),
                    firstname   : <string> this.navParams.get('personal_firstname'),
                    IDnum       : <string> this.navParams.get('personal_IDnum'),
                    cellNo      : <string> this.navParams.get('personal_cellNo'),
        };
      }

       onFisherFinishCommunity()   {
                if (this.isFisherCommunityValid()) {
                        this.fisherService.fisherUpdateCommunity(this.community_info);
                        this.navCtrl.push(FisherConfirmPage,this.confirm_personal);
                }
                else{
                        console.log("There are issues with your community submission");
                }
      }

      //check if the information entered on the community page is valid
      isFisherCommunityValid(): boolean {

                if(this.community_info.comm_province == null){
                        console.log("No province selected");
                        return false;
                }

                else{// Province has been selected by user

                            // No community has been selected
                            if(this.community_info.comm_community == null){
                                    if(!this.community_info.comm_not_listed){//no community selected BUT not indicated that community is not listed
                                        console.log("Select community or indicate community not listed");
                                        return false;
                                    }

                                    else{
                                        console.log("Sorry your community is not listed");
                                        return true;//i.e. no community selected but user indicated that community is not listed
                                    }
                            }

                            else{// A community has been selected
                                    if(this.community_info.comm_not_listed){//Community selected BUT still indicates that community is not listed
                                            console.log("Your have selected a community, uncheck the not available box");
                                            return false;
                                    }

                                    console.log("Your community selection has been noted");
                                    return true;
                            }
                }

      }//end method



    //TODO -- improve this to read these communities from a csv file/from an API call
    private list_of_communities = [
        "name_eng__c,province_abbreviation__c,unique_ext_id__c",
        "Ocean View,WC,ocean_view",
        "Lamberts Bay,WC,lambertsbaai",
        "Struis Bay,WC,struisbaai",
        "Kleinmond,WC,kleinmond",
        "Port Nolloth,NC,portnolloth",
        "Hondeklip Bay,NC,hondeklipbaai",
        "Saint Helena,WC,sainthelena",
        "Doring Bay,WC,doringbaai",
        "Olifants,WC,olifants",
        "Elands Bay,WC,elandsbaai",
        "Demo Community,WC,democommunity",
        "Muizenberg,WC,muizenberg",
        "Bellville,WC,bellville",
        "Hermanus,WC,hermanus",
        "Kalk Bay,WC,kalk_bay",
        "Grassy Park,WC,grassy_park",
        "Strand,WC,strand",
        "Strandfontein (False Bay),WC,strandfontein_falsebay",
        "Hout Bay,WC,hout_bay",
        "Simon's Town,WC,simonstown",
        "Gordon's Bay,WC,gordons_bay",
        "Arniston,WC,arniston",
        "St Helena Island,SHI,sainthelenaisland",
        "Langebaan,WC,langebaan",
        "Paternoster,WC,paternoster",
        "Bettys Bay,WC,bettysbay",
        "Pringle Bay,WC,pringlebay",
        "Cape Town,WC,capetown",
        "Coffee Bay,KZN,coffeebay"];

}//end class
