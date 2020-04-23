import { Actions } from '../../types/state';
import { Types } from '../types';
import { LocalStatus } from '../../types';

const localStatus = (state = {}, action: Actions): LocalStatus => {
  switch (action.type) {
    case Types.SET_LOCAL_STATUS:
      return action.localStatus;
    default:
      return state;
  }
};

export default localStatus;
