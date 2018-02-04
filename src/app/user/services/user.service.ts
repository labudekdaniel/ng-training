import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { User } from '../';
import { ApiService } from '../../shared/';



@Injectable()
export class UserService extends ApiService {

/*public constructor(private _http: HttpClient) {
    //
  }*/

  public register(user: User): Observable<Response> {
    return this._http.post<Response>(
      environment.apiEndpoint + '/user/register',
      user
    );
  }

  public checkPassword(user: User): Observable<Response> {
    return this.request('POST', 'auth', user);
  }

  public update(user: User): Observable<User> {
    return this.request('PATCH', 'user/' + user.id, user);
  }
 

}
