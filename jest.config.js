const esModules = ['validator'].join('|');

module.exports = {
  moduleDirectories: ['node_modules', 'src/client'],
  setupFilesAfterEnv: ['<rootDir>/src/client/testing/setup.ts'],
  preset: 'jest-preset-angular',
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  transformIgnorePatterns: [`./node_modules/(?!${esModules})`],
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage',
};
