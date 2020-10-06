import React from 'react';
import { Helmet } from 'react-helmet';
import I18n from '../../../utils/I18n';

interface Props {
  options?: I18n.TranslateOptions;
}

const HtmlHeader: React.FC<Props> = ({ options }) => {
  return (
    <Helmet>
      <html lang={!options || !options.locale ? I18n.locale : options.locale} />
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
