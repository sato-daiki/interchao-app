import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import {
  ALGOLIA_API_KEY, // APPLICATION_ID
  ALGOLIA_ADMIN_API_KEY,
} from '@env';

type SortType = 'createdAt' | 'updatedAt';

class Algolia {
  private client: SearchClient;

  private isProd = false;

  constructor() {
    this.client = algoliasearch(ALGOLIA_API_KEY, ALGOLIA_ADMIN_API_KEY);

    if (__DEV__) {
      this.isProd = false;
    } else {
      this.isProd = true;
    }
  }

  public getDiaryIndex = async (clean = false): SearchIndex => {
    if (clean) {
      this.client.clearCache();
    }
    if (this.isProd) {
      return this.client.initIndex('prod_diaries');
    }
    return this.client.initIndex('dev_diaries');
  };

  public setSettings = async (
    index: SearchIndex,
    sortType: SortType = 'createdAt'
  ): Promise<void> => {
    if (sortType === 'createdAt') {
      await index.setSettings({
        ranking: [
          'desc(createdAt._seconds)',
          'typo',
          'geo',
          'words',
          'filters',
          'proximity',
          'attribute',
          'exact',
          'custom',
        ],
      });
    } else if (sortType === 'updatedAt') {
      await index.setSettings({
        ranking: [
          'desc(updatedAt._seconds)',
          'typo',
          'geo',
          'words',
          'filters',
          'proximity',
          'attribute',
          'exact',
          'custom',
        ],
      });
    }
  };
}

let instance: Algolia | null = null;

const AlgoliaClient = () => {
  if (!instance) {
    instance = new Algolia();
  }
  return instance;
};

export default AlgoliaClient();
