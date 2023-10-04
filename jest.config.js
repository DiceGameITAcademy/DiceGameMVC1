module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    '^@server/(.*)$': '<rootDir>/server/src/$1',
  },
};


// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     cacheDirectory: '.tmp/jestCache'
//   };