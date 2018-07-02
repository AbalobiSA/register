export class CommunityClass{
    //the blue-print of a community
    name_eng        : string;
    province_abbrev : string;
    unique_ext_id   : string;

    constructor(inputName:string, inputProv: string, inputID: string){
        this.name_eng           = inputID;
        this.province_abbrev    = inputProv;
        this.unique_ext_id      = inputID;
    }//end constructor


}//end class