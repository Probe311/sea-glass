/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/dist/**', 'node_modules/**', 'examples/**'],
  rules: {
    'selector-class-pattern': [
      '^(sg-refract|sg(-[a-z0-9]+)+(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?)$',
      {
        message:
          'Expected class selector to use the sg- prefix (BEM: .sg-block, .sg-block__el, .sg-block--mod)',
      },
    ],
    'custom-property-pattern': [
      '^sg(-[a-z0-9]+)+$',
      { message: 'Expected custom property to use the --sg-* prefix' },
    ],
    'keyframes-name-pattern': [
      '^sg(-[a-z0-9]+)+$',
      { message: 'Expected keyframes to use the sg- prefix' },
    ],
    'selector-id-pattern': ['^sg(-[a-z0-9]+)+$', { message: 'Expected id to use the sg- prefix' }],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer'] }],
    'import-notation': 'string',
    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'property-no-unknown': [true, { ignoreProperties: ['corner-shape'] }],
    'declaration-property-value-no-unknown': [
      true,
      { ignoreProperties: { 'corner-shape': ['/./'] } },
    ],
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'no-descending-specificity': null,
    'media-feature-range-notation': 'prefix',
  },
};
