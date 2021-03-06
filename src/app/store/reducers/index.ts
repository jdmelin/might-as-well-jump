import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { environment } from '../../../environments/environment';
import {
  initialSelectedUser,
  selectedUserReducer,
} from './selectedUser.reducer';
import { usersReducer } from './users.reducer';

export interface AppState {
  selectedUser: User;
  users: User[];
}

export const initialAppState = {
  selectedUser: initialSelectedUser,
  users: [],
};

export const reducers: ActionReducerMap<AppState> = {
  selectedUser: selectedUserReducer,
  users: usersReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
