import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from 'src/app/models/userForm.model';
import { initialSelectedUser } from 'src/app/store/reducers/selectedUser.reducer';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { StateService } from '../state-service/state.service';

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

  private resetAndNavigateToUsers(): void {
    this.stateService.setUsers([]);
    this.stateService.setSelectedUser(initialSelectedUser);
    this.router.navigate(['users']);
  }

  createUser(user: UserForm): void {
    this.http.post(`${environment.apiUrl}/systemusers`, user).subscribe(
      () => this.resetAndNavigateToUsers(),
      (err) => console.error(err)
    );
  }

  deleteUser(id: string): void {
    this.http.delete(`${environment.apiUrl}/systemusers/${id}`).subscribe(
      () => this.resetAndNavigateToUsers(),
      (err) => console.error(err)
    );
  }

  fetchUsers(): void {
    this.http.get(`${environment.apiUrl}/systemusers`).subscribe(
      (response: any) => {
        const usersResponse = response.results;
        if (!usersResponse.length) {
          this.router.navigate(['add-user']);
        }
        const users = this.formatUsers(usersResponse);
        this.stateService.setUsers(users);
      },
      (err) => console.error(err)
    );
  }

  fetchUserById(id: string): void {
    this.http.get(`${environment.apiUrl}/systemusers/${id}`).subscribe(
      (userResponse: any) => {
        // redirect & return if requesting a bogus id
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

  getUserFromStateUsers(id: string): void {
    this.stateService.getUsers().subscribe((users: User[]) => {
      const user = users.find((u: User) => u.id === id);
      if (user) {
        this.stateService.setSelectedUser(user);
      }
    });
  }

  updateUser(user: UserForm, id: string): void {
    this.http.put(`${environment.apiUrl}/systemusers/${id}`, user).subscribe(
      () => this.resetAndNavigateToUsers(),
      () => this.router.navigate(['users'])
    );
  }
}
