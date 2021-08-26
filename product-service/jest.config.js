/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>'
  ],
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@db/(.*)': '<rootDir>/src/db/$1'
  }
};