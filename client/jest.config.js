const path = require('path');

module.exports = {
  collectCoverageFrom: ['**/src/**/*.(ts|tsx|js|jsx)', '!src/index.tsx'],

  // TODO: Increase threshold average to 90%
  // I am fully aware that this is not the best metric for testing confidence,
  // but with the exception of a few folders this will be a good baseline.
  coverageThreshold: {
    global: {statements: 85, branches: 85, functions: 84, lines: 85},
  },
  moduleDirectories: ['node_modules', path.join(__dirname, './test-setup')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.module\\.(scss|css)$': 'identity-obj-proxy',
    'components(.*)$': '<rootDir>/src/components/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  projects: ['./test-setup/jest.lint.js'],
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['webpack/*', 'test-setup/*'],
  watchPlugins: ['jest-watch-select-projects'],
};
