import { Timestamp } from './diary';

// 更新はないのでupdatedAtはない
export interface Correcting {
  uid: string;
  correctedNum: number;
  createdAt: Timestamp;
}
