module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            screens: ['./src/components/screens'],
            layouts: ['./src/components/layouts'],
            navigation: ['./src/components/navigation'],
            hooks: ['./src/hooks'],
            components: ['./src/components'],
            assets: ['./assets'],
          },
        },
      ],
    ],
  };
};
