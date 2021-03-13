import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private stateService: StateService
  ) {}

  private formatUser(userResponse: any): User {
    const {
      email,
      firstname: firstName,
      id,
      lastname: lastName,
      username,
    } = userResponse;

    return {
      email,
      firstName,
      id,
      lastName,
      username,
    };
  }

  private formatUsers(usersResponse: any): User[] {
    const formattedUsers = usersResponse.map((user: any) =>
      this.formatUser(user)
    );
    return formattedUsers;
  }

  private reFetchAndNavigateToUsers(): void {
    this.stateService.setUsers([]);
    this.fetchUsers();
    this.router.navigate(['users']);
  }

  createUser(user: User): void {
    this.http
      .post(`${environment.apiUrl}/systemusers`, user)
      .subscribe(() => this.reFetchAndNavigateToUsers());
  }

  deleteUser(id: string): void {
    const params = new HttpParams().append('id', id);
    this.http
      .delete(`${environment.apiUrl}/systemusers/${id}`, { params })
      .subscribe(() => this.reFetchAndNavigateToUsers());
  }

  fetchUsers(): void {
    this.http
      .get(`${environment.apiUrl}/systemusers`)
      .subscribe((response: any) => {
        const usersResponse = response.results;
        const users = this.formatUsers(usersResponse);
        this.stateService.setUsers(users);
      });
  }

  fetchUserById(id: string): void {
    const params = new HttpParams().append('id', id);
    this.http
      .get(`${environment.apiUrl}/systemusers/${id}`, { params })
      .subscribe(
        (userResponse: any) => {
          if (!userResponse) {
            this.router.navigate(['users']);
            return;
          }
          const user = this.formatUser(userResponse);
          this.stateService.setSelectedUser(user);
        },
        () => this.router.navigate(['users'])
      );
  }

  updateUser(user: User, id: string): void {
    const params = new HttpParams().append('id', id);
    this.http
      .put(`${environment.apiUrl}/systemusers/${id}`, user, { params })
      .subscribe(() => this.reFetchAndNavigateToUsers());
  }
}
