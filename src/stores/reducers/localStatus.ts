import { Actions } from '../../types/state';
import { Types } from '../types';
import { LocalStatus } from '../../types';

const initialState: LocalStatus = {
  unreadCorrectionNum: 0,
  isLoading: true,
  isSignout: false,
  uid: null,
};

const localStatus = (state = initialState, action: Actions): LocalStatus => {
  switch (action.type) {
    case Types.SET_LOCAL_STATUS:
      return action.localStatus;
    case Types.RESTORE_UID:
      return {
        ...state,
        uid: action.uid,
        isLoading: false,
      };
    case Types.SIGN_IN:
      return {
        ...state,
        isSignout: false,
        uid: action.uid,
      };
    case Types.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        uid: null,
      };
    default:
      return state;
  }
};

export default localStatus;
