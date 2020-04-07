import { Actions } from '../../types/state';
import { Types } from '../types';

const localStatus = (state = {}, action: Actions) => {
  switch (action.type) {
    case Types.SET_LOCAL_STATUS:
      return action.localStatus;
    default:
      return state;
  }
};

export default localStatus;
