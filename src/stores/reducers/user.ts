import { Actions } from '../../types/state';
import { Types } from '../types';

const user = (state = {}, action: Actions) => {
  switch (action.type) {
    case Types.SET_USER:
      return action.user;
    case Types.SET_POINTS:
      return {
        ...state,
        points: action.points,
      };
    default:
      return state;
  }
};

export default user;
