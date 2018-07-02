import{CommunityClass} from "./community_class";

export class CommunityInfoClass{

  comm_province             : string="";
  comm_not_listed           : boolean=false;
  comm_IRP_chosen           : boolean=false;
  comm_commercial_chosen    : boolean=false;
  comm_recreational_chosen  : boolean=false;
  comm_other_chosen         : boolean=false;

  comm_all_communities : CommunityClass[];//an array of all the available 



  constructor(){

  }
}
