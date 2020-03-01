import { Action } from 'redux';
import { Profile } from '../../types/profile';
import { Types } from '../types';

export interface SetProfileAction extends Action {
  type: Types.SET_PROFILE;
  profile: Profile;
}

export const setProfile = (profile: Profile): SetProfileAction => ({
  type: Types.SET_PROFILE,
  profile,
});
