import { Actions } from '../../types/state';
import { Types } from '../types';

const user = (state = {}, action: Actions) => {
  switch (action.type) {
    case Types.SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
