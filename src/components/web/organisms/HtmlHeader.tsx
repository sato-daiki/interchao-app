import React from 'react';
import * as Localization from 'expo-localization';
import { Helmet } from 'react-helmet';
import I18n from '../../../utils/I18n';

interface Props {
  options?: I18n.TranslateOptions;
}

const HtmlHeader: React.FC<Props> = ({ options }) => {
  const code = Localization.locale.split('-')[0];
  return (
    <Helmet>
      <html lang={!options || !options.locale ? code : options.locale} />
      <meta name="keyword" content={I18n.t('helmet.keyword', options)} />
      <meta
        name="description"
        content={I18n.t('helmet.description', options)}
      />
      <meta name="og:title" content={I18n.t('helmet.ogTitle', options)} />
      <meta
        name="og:description"
        content={I18n.t('helmet.ogDescription', options)}
      />
      <meta name="twitter:title" content={I18n.t('helmet.ogTitle', options)} />
    </Helmet>
  );
};

export default HtmlHeader;
