import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';

const removeTrailingSlash = url => {
  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  }
  return url;
};

export default function openBrowserSafely(url) {
  const trimmedUrl = url.trim();

  try {
    const validUrl = new URL(trimmedUrl).toString();
    WebBrowser.openBrowserAsync(encodeURI(removeTrailingSlash(validUrl)));
  } catch {
    // Failed to parse `url`
    Alert.alert(
      'エラー',
      'ご指定のページを開くことが出来ません。URLを確認してください。'
    );
  }
}
