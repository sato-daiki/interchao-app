import algoliasearch, {
  SearchClient,
  SearchIndex,
  QueryParameters,
} from 'algoliasearch';
import {
  ALGOLIA_API_KEY, // APPLICATION_ID
  ALGOLIA_ADMIN_API_KEY,
} from '@env';

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

  public getDiaryIndex = async (): SearchIndex => {
    if (this.isProd) {
      return this.client.initIndex('prod_diaries');
    }
    return this.client.initIndex('dev_diaries');
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
