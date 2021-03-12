import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/systemusers`);
    // this.http.get(`${environment.apiUrl}/systemusers`).subscribe((response: any) => {
    //   const users = response.results;
    //   this.stateService.setUsers(users);
    // })
  }
}
