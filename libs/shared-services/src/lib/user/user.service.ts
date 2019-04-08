import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '@insight/shared-model';
import { environmentToken } from '@insight/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(environmentToken) private environment: string,
              private httpClient: HttpClient) {}

  search(fragment: string): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.environment}/user?fragment=${fragment}`);
  }
}
