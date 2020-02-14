export type Language = 'ja' | 'en';

export interface User {
  id?: string;
  email?: string | null;
  password?: string;
  learnLanguage?: Language;
  nativeLanguage?: Language;
  userName?: string;
}
