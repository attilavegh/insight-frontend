import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  search(fragment: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/user?fragment=${fragment}`);
  }
}
