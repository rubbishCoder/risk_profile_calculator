const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  // globals: {
  //   'ts-jest': {
  //     babelConfig: true,
  //   },
  // },
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1',
  //   '^~/(.*)$': '<rootDir>/$1',
  //  '@react-navigation': '<rootDir>/__mocks__/@react-navigation.js',
  // },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {//the content you'd placed at "global"
      babelConfig: true
    }]
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '\\.snap$'],
};
