import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { initialAppState } from 'src/app/store/reducers';
import { environment } from 'src/environments/environment';
import userMock from 'src/mocks/user.mock';
import userFormMock from 'src/mocks/userForm.mock';
import usersMock from 'src/mocks/users.mock';
import { StateService } from '../state-service/state.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let http: HttpClient;
  let router: Router;
  let service: UsersService;
  let stateService: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore({ initialState: initialAppState })],
    });
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    service = TestBed.inject(UsersService);
    stateService = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    const user = userFormMock;
    spyOn(http, 'post').and.returnValue(of({}));
    spyOn(service as any, 'resetAndNavigateToUsers');
    service.createUser(user);
    expect(http.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers`,
      user
    );
    expect((service as any).resetAndNavigateToUsers).toHaveBeenCalled();
  });

  it('should delete user', () => {
    const user = userMock;
    spyOn(http, 'delete').and.returnValue(of({}));
    spyOn(service as any, 'resetAndNavigateToUsers');
    service.deleteUser(user.id);
    expect(http.delete).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers/${user.id}`
    );
    expect((service as any).resetAndNavigateToUsers).toHaveBeenCalled();
  });

  it('should fetch users', () => {
    const response = { results: [{}, {}] };
    const formattedUsers = usersMock;
    spyOn(http, 'get').and.returnValue(of(response));
    spyOn(service as any, 'formatUsers').and.returnValue(formattedUsers);
    spyOn(stateService, 'setUsers');
    service.fetchUsers();
    expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/systemusers`);
    expect((service as any).formatUsers).toHaveBeenCalledWith(response.results);
    expect(stateService.setUsers).toHaveBeenCalledWith(formattedUsers);
  });

  it('should redirect to /add-user if there are no users', () => {
    const response = { results: [] };
    spyOn(http, 'get').and.returnValue(of(response));
    spyOn(router, 'navigate');
    service.fetchUsers();
    expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/systemusers`);
    expect(router.navigate).toHaveBeenCalledWith(['add-user']);
  });

  it('should fetch user by id', () => {
    const response = {};
    const formattedUser = userMock;
    const { id } = userMock;
    spyOn(http, 'get').and.returnValue(of(response));
    spyOn(service as any, 'formatUser').and.returnValue(formattedUser);
    spyOn(stateService, 'setSelectedUser');
    service.fetchUserById(id);
    expect(http.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers/${id}`
    );
    expect((service as any).formatUser).toHaveBeenCalledWith(response);
    expect(stateService.setSelectedUser).toHaveBeenCalledWith(formattedUser);
  });

  it('should redirect to /users if requesting a bogus id', () => {
    const response = null;
    const { id } = userMock;
    spyOn(http, 'get').and.returnValue(of(response));
    spyOn(router, 'navigate');
    service.fetchUserById(id);
    expect(http.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers/${id}`
    );
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should redirect to /users if there is an error', () => {
    const { id } = userMock;
    const errorResponse = new HttpErrorResponse({});
    spyOn(http, 'get').and.returnValue(throwError(errorResponse));
    spyOn(router, 'navigate');
    service.fetchUserById(id);
    expect(http.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers/${id}`
    );
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should get user from state users if user exists', () => {
    const user = userMock;
    spyOn(stateService, 'getUsers').and.returnValue(of(usersMock));
    spyOn(stateService, 'setSelectedUser');
    service.getUserFromStateUsers(user.id);
    expect(stateService.setSelectedUser).toHaveBeenCalledWith(user);
  });

  it('should update user', () => {
    const user = userMock;
    spyOn(http, 'put').and.returnValue(of({}));
    spyOn(service as any, 'resetAndNavigateToUsers');
    service.updateUser(user, user.id);
    expect(http.put).toHaveBeenCalledWith(
      `${environment.apiUrl}/systemusers/${user.id}`,
      user
    );
    expect((service as any).resetAndNavigateToUsers).toHaveBeenCalled();
  });
});
