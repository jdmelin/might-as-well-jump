import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUsers = createAction(
  '[Users] Set Users',
  props<{ users: User[] }>()
);
