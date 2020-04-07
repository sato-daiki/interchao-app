import { Action } from 'redux';
import { LocalStatus } from '../../types/localStatus';
import { Types } from '../types';

export interface SetLocalStatusAction extends Action {
  type: Types.SET_LOCAL_STATUS;
  localStatus: LocalStatus;
}

export const setLocalStatus = (
  localStatus: LocalStatus
): SetLocalStatusAction => ({
  type: Types.SET_LOCAL_STATUS,
  localStatus,
});
