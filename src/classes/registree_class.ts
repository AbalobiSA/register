import{Injectable} from "@angular/core";

@Injectable()
export class Registree{

  //Role details
  role       :  string="";

  //Terms of use details
  terms_agreed      : boolean;
  assistant_agreed  : boolean;
  DAFF_agreed       : boolean;

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
  comm_not_listed       :boolean;
  IRP_selected          :boolean;
  commercial_selected   :boolean;
  recreational_selected :boolean;

  constructor(){

  }

}//end class registree
