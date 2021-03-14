import { User } from 'src/app/models/user.model';
import userMock from 'src/mocks/user.mock';
import { setSelectedUser } from '../actions/selectedUser.actions';
import * as fromReducer from './selectedUser.reducer';

describe('SelectedUserReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialSelectedUser } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.selectedUserReducer(
        initialSelectedUser,
        action
      );
      expect(state).toBe(initialSelectedUser);
    });
  });

  describe('setUsers action', () => {
    it('should retrieve selected user and update the state in an immutable way', () => {
      const { initialSelectedUser } = fromReducer;
      const selectedUser = userMock;
      const newState: User = selectedUser;
      const action = setSelectedUser({ selectedUser });
      const state = fromReducer.selectedUserReducer(
        initialSelectedUser,
        action
      );
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
