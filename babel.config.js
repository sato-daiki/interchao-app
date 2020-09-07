module.exports = function(api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src/',
        },
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    // set the same configs as `react-native-dotenv`
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
