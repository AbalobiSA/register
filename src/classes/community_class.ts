export class CommunityClass{
    //the blue-print of a community
    name_key        : string;
    province_abbrev : string;
    name_Eng        : string;

    constructor(name_key:string, province_abbrev: string, name_Eng: string){
        this.name_key           = name_key;
        this.province_abbrev    = province_abbrev;
        this.name_Eng           = name_Eng;
    }//end constructor


}//end class