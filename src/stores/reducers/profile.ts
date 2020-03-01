import { Actions } from '../../types/state';
import { Types } from '../types';

const profile = (state = {}, action: Actions) => {
  switch (action.type) {
    case Types.SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

export default profile;
