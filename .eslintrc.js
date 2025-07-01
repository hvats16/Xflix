module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    
    // General rules - Turn off warnings for cleaner development
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'prefer-const': 'off',
    'no-var': 'off',
    'no-undef': 'off',
    
    // Code style - Turn off for now
    'eqeqeq': 'off',
    'curly': 'off',
    'brace-style': 'off',
    'comma-dangle': 'off',
    'quotes': 'off',
    'semi': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 