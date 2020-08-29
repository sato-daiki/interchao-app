import axios from 'axios';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved, import/extensions
import { GOOGLE_TRANSLATE } from '../../envConfig';
import Sentry from '../constants/Sentry';
import { Language } from '../types';

const endpoint = 'https://translation.googleapis.com/language/translate/v2';

const googleTranslate = async (
  text: string,
  targetLanguage: Language
): Promise<string> => {
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      key: GOOGLE_TRANSLATE,
      q: text,
      target: targetLanguage,
    },
  };
  try {
    const { data } = await axios.get(endpoint, options);
    if (data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    }
  } catch (err) {
    Sentry.captureException(err);
  }
  return text;
};

export default googleTranslate;
