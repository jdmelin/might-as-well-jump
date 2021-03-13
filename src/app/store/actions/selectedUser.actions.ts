import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setSelectedUser = createAction(
  '[Selected User] Set Selected User',
  props<{ selectedUser: User }>()
);
