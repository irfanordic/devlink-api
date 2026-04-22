module.exports = {
  preset: 'ts-jest/presets/default-esm', // 👈 This preset is specifically for ESM
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // 👈 This fixes the .js extension issue
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // 👈 Tells ts-jest to keep the imports as ESM
      },
    ],
  },
};