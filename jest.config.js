module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    setupFiles: ['<rootDir>/tests/setEnvVars.ts']
};
