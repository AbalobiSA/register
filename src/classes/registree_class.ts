import{Injectable} from "@angular/core";
import {RoleInfoClass} from "./role_info_class";
import {ProvinceClass} from "./province_class";

@Injectable()
export class Registree{

  //Role details
  role       :  string="";//RoleInfoClass;

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
  IRP_selected          :boolean//type of permits
  commercial_selected   :boolean;
  recreational_selected :boolean;

  constructor(){

  }

}//end class registree
