import{Injectable} from "@angular/core";

@Injectable()
export class Registree{

        //Role details
        role       :  string="";

        //Terms of use details
        terms_agreed      : boolean=false;
        assistant_agreed  : boolean=false;
        DAFF_agreed       : boolean=false;

        //Personal details
        surname    : string = "";
        firstname  : string = "";
        nickname   : string = "";
        gender     : string = "";
        IDnum      : string = "";
        cellNo     : string = "";
        password   : string = "";

        //Community details
        province              :string="";
        community             :string="";
        custom_community      :string="";
        comm_not_listed       :boolean=false;
        IRP_selected          :boolean=false;
        commercial_selected   :boolean=false;
        recreational_selected :boolean=false;
        other_seleted         :boolean=false;

        constructor(){

         }

}//end class registree
