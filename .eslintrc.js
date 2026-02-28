module.exports = {
  root: true,
  extends: ['@workspace/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}; 