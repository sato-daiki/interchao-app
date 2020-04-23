import { Actions } from '../../types/state';
import { Types } from '../types';
import { Profile } from '../../types';

const profile = (state, action: Actions): Profile => {
  switch (action.type) {
    case Types.SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

export default profile;
