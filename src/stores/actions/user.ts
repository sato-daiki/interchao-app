import { Action } from 'redux';
import { User } from '../../types/user';
import { Types } from '../types';

export interface SetUserAction extends Action {
  type: Types.SET_USER;
  user: User;
}

export const setUser = (user: User): SetUserAction => ({
  type: Types.SET_USER,
  user,
});

export interface SetPointsAction extends Action {
  type: Types.SET_POINTS;
  points: number;
}

export const setPoints = (points: number): SetPointsAction => ({
  type: Types.SET_POINTS,
  points,
});
