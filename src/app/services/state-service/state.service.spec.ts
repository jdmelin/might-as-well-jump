import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import userMock from 'src/mocks/user.mock';
import usersMock from 'src/mocks/users.mock';
import { User } from '../../models/user.model';
import { setSelectedUser } from '../../store/actions/selectedUser.actions';
import { setUsers } from '../../store/actions/users.actions';
import { initialAppState } from '../../store/reducers';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: initialAppState })],
    });
    service = TestBed.inject(StateService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getSelectedUser', () => {
    const selectedUser = userMock;
    spyOn(store, 'pipe').and.returnValue(of(selectedUser));
    service.getSelectedUser().subscribe((user: User) => {
      expect(user).toEqual(selectedUser);
    });
  });

  it('should getUsers', () => {
    const mockUsers = usersMock;
    spyOn(store, 'pipe').and.returnValue(of(mockUsers));
    service.getUsers().subscribe((users: User[]) => {
      expect(users).toEqual(mockUsers);
    });
  });

  it('should setSelectedUser', () => {
    const selectedUser = userMock;
    spyOn(store, 'dispatch');
    service.setSelectedUser(selectedUser);
    expect(store.dispatch).toHaveBeenCalledWith(
      setSelectedUser({ selectedUser })
    );
  });

  it('should setUsers', () => {
    const users = usersMock;
    spyOn(store, 'dispatch');
    service.setUsers(users);
    expect(store.dispatch).toHaveBeenCalledWith(setUsers({ users }));
  });
});
