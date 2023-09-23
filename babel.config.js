module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@navigation': './src/navigation',
            '@pages': './src/pages',
            '@services': './src/services',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  }
}
