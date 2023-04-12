import axios, { AxiosRequestConfig } from 'axios';
// @ts-ignore
import { LANGUAGE_TOOL } from '@env';
import { Language } from '../types';

const spellChecker = async (
  text: string,
  targetLanguage: Language,
): Promise<any> => {
  const encodedParams = new URLSearchParams();
  encodedParams.append('language', 'en-US');
  encodedParams.append('text', 'This is a error.');

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://api.languagetoolplus.com/v2/check',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': LANGUAGE_TOOL,
      'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com',
    },
    data: encodedParams,
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return;
    });
};

export default spellChecker;
