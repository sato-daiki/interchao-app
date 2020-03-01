import { User } from './user';
import { Profile } from './profile';
import { SetUserAction, SetPointsAction } from '../stores/actions/user';
import { SetProfileAction } from '../stores/actions/profile';

export interface State {
  rootReducer: {
    user: User;
    profile: Profile;
  };
}

export type Actions = SetUserAction | SetPointsAction | SetProfileAction;
