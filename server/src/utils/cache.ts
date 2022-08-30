import Redis from 'ioredis';
import { Data, CacheData } from '../interfaces';
import logger from '../logger';

export const client = new Redis();

client.on('connect', () => {
  logger.log({
    level: 'info',
    message: 'Redis Connected!'
  });
});

export const getOrSetCache = async <T>(options: Data<T>): Promise<CacheData<T> | null> => {
  let data: CacheData<T> | null = null;

  try {
    const { key, value } = options;
    const res = await client.hgetall(key);

    if (!res) {
      if (value) {
        await client.hset(key, JSON.stringify(value));
      }
    } else {
      data = {
        key,
        value: res!
      };
    }
  } catch (e) {
    if (e) {
      throw new Error('Failed to get or set cache!');
    }
  }

  if (!data) {
    const { key } = options;
    const res = await client.hgetall(key);

    // # set ttl
    await client.expireat(key, 60 * 60 * 24);

    return {
      key,
      value: res!
    } as CacheData<T>;
  }

  return data;
};
