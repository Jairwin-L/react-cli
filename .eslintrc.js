module.exports = {
  plugins: ['import'],
  // parserOptions: {
  //   sourceType: module,
  //   ecmaVersion: 6,
  // },
  rules: {
    'prefer-arrow-callback': [0, { allowNamedFunctions: 0 }],
    'react/display-name': 0,
    'no-console': 0,
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
          },
          {
            pattern: 'antd',
            group: 'external',
          },
          {
            pattern: 'lodash',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/api/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/constants/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  extends: [
    'eslint-config-ali/typescript/react',
    'prettier',
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
  ],
};
