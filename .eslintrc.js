module.exports = {
  extends: ['airbnb-typescript-prettier', 'plugin:jest/recommended'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    eqeqeq: ['error', 'smart'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'react/require-default-props': [
      'warn',
      { forbidDefaultForRequired: false, ignoreFunctionalComponents: true },
    ],

    '@typescript-eslint/no-empty-interface': [
      'off',
      {
        allowSingleExtends: false,
      },
    ],
    'react/no-array-index-key': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-param-reassign': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-underscore-dangle': 'off',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/ignore': './generated',
  },
};
