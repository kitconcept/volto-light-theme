module.exports = function (api) {
  api.cache(true);
  const presets = ['@plone/razzle'];
  const plugins = [
    [
      'react-intl', // React Intl extractor, required for the whole i18n infrastructure to work
      {
        messagesDir: './build/messages/',
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
