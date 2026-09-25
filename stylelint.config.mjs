import { BROWSER_TARGET } from './src/browser-target.ts'

const browsers = BROWSER_TARGET.map((target) =>
  target.replace(/^([a-z]+)(\d+)$/, '$1 $2')
)

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-recommended', 'stylelint-config-html/astro'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  ignoreFiles: ['dist/**', '.astro/**', 'node_modules/**'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: [...browsers, 'ios_saf 16'],
        // Lightning CSS flattens nesting down to BROWSER_TARGET. See ADR 0008.
        ignore: ['css-nesting'],
        ignorePartialSupport: true,
        severity: 'error',
      },
    ],
    // `pre code` before `code` in the prose containers is intentional; the
    // higher-specificity selector wins regardless of order.
    'no-descending-specificity': null,
    'media-feature-range-notation': 'prefix',
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': [
      'rgb',
      'rgba',
      'hsl',
      'hsla',
      'hwb',
      'lab',
      'lch',
      'oklab',
      'oklch',
      'color',
    ],
  },
  overrides: [
    {
      files: ['src/styles/global.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
      },
    },
  ],
}
