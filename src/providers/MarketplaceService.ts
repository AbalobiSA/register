import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MarketplaceService {

  // SERVER_URL = "http://localhost:1337";
  SERVER_URL = "http://169.239.183.156:1337";

  constructor(private http: HttpClient) {

  }

  checkIfUserAlreadyExists(username: string): Promise<any> {
    return this.http.get(this.SERVER_URL + "/api/users/find/?username=" + username).toPromise();
  }

  registerUser(user): Promise<any> {
    return this.http.post(this.SERVER_URL + "/api/users/create/", user).toPromise();
  }
}
