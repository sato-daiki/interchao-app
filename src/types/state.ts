import { User } from './user';
import { SetUserAction } from '../stores/actions/user';

export interface State {
  rootReducer: {
    user: User;
  };
}

export type Actions = SetUserAction;
