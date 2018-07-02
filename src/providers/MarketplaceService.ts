import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import{Secrets} from "../classes/secrets";

@Injectable()
export class MarketplaceService {

secrets: Secrets = new Secrets();

  constructor(private http: HttpClient) {

  }

  checkIfUserAlreadyExists(username: string): Promise<any> {
    return this.http.get(this.secrets.marketplaceCheckUserURL + username).toPromise();
  }

  registerUser(user): Promise<any> {
    return this.http.post(this.secrets.marketplaceAddUserURL, user).toPromise();
  }
}


