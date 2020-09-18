import React from 'react';
import renderer from 'react-test-renderer';
import firebase from '../constants/firebase';
import { getRunningWeeks, getUsePoints } from './diary';

describe('diary #getUsePoints', () => {
  it('英語、600以上', () => {
    const points = getUsePoints(700, 'en');
    expect(points).toBe(20);
  });

  it('英語、600以下', () => {
    const points = getUsePoints(500, 'en');
    expect(points).toBe(10);
  });
});

describe('diary #getRunningWeeks', () => {
  // it('通常', () => {
  //   const weeks = getRunningWeeks(3, firebase.firestore.Timestamp.now());
  //   expect(weeks).toEqual(4);
  // });
  it('初回', () => {
    const weeks = getRunningWeeks(0, null);
    expect(weeks).toEqual(1);
  });

  it('今週すでに投稿', () => {
    const weeks = getRunningWeeks(1, firebase.firestore.Timestamp.now());
    expect(weeks).toEqual(1);
  });
});
