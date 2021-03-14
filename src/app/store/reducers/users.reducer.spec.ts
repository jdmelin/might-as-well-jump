import { User } from 'src/app/models/user.model';
import usersMock from 'src/mocks/users.mock';
import { setUsers } from '../actions/users.actions';
import * as fromReducer from './users.reducer';

describe('UsersReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialUsersState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.usersReducer(initialUsersState, action);
      expect(state).toBe(initialUsersState);
    });
  });

  describe('setUsers action', () => {
    it('should retrieve users and update the state in an immutable way', () => {
      const { initialUsersState } = fromReducer;
      const users = usersMock;
      const newState: Array<User> = users;
      const action = setUsers({ users });
      const state = fromReducer.usersReducer(initialUsersState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
