import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@insight/shared-model';
import { environmentToken } from '@insight/environment';

import { Observable } from 'rxjs';

export interface UserServiceShape {
  search(fragment: string): Observable<User[]>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceShape {

  constructor(@Inject(environmentToken) private environment: string,
              private httpClient: HttpClient) {}

  search(fragment: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.environment}/user?fragment=${fragment}`);
  }
}
