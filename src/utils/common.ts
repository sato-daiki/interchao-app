import { v4 as uuidv4 } from 'uuid';
import * as Random from 'expo-random';

export const getUuid = async (): Promise<string> =>
  uuidv4({ random: await Random.getRandomBytesAsync(16) });
