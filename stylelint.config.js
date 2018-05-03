module.exports = {
  extends: [
    // Use the Standard config as the base
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // Enforce a standard order for CSS properties
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
    // Override rules that would interfere with Prettier
    // https://github.com/shannonmoeller/stylelint-config-prettier
    'stylelint-config-prettier',
    // Override rules to allow linting of CSS modules
    // https://github.com/pascalduez/stylelint-config-css-modules
    'stylelint-config-css-modules',
  ],
  plugins: [
    // Bring in some extra rules for SCSS
    'stylelint-scss',
    'stylelint-no-unsupported-browser-features',
    'stylelint-declaration-use-variable',
  ],
  // Rule lists:
  // - https://stylelint.io/user-guide/rules/
  // - https://github.com/kristerkari/stylelint-scss#list-of-rules
  rules: {
    // Allow newlines inside class attribute values
    'string-no-newline': null,
    // Enforce camelCase for classes and ids, to work better
    // with CSS modules
    'selector-class-pattern': /^[a-z][a-zA-Z]+$/,
    'selector-id-pattern': /^[a-z][a-zA-Z]+$/,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    // Disallow allow global element/type selectors in scoped modules
    'selector-max-type': [0, { ignore: ['child', 'descendant', 'compounded'] }],
    // Custom rules by Dmitry
    'selector-max-compound-selectors': 5,
    'sh-waqar/declaration-use-variable': '/color/',
    'declaration-block-no-duplicate-properties': true,
    'no-duplicate-selectors': true,
    'no-unknown-animations': true,
    'color-named': 'never',
    'function-url-scheme-blacklist': 'data',
    'property-no-vendor-prefix': true,
    'declaration-no-important': true,
    'declaration-block-single-line-max-declarations': 1,
    'selector-no-qualifying-type': [ true, { 'ignore': ['attribute'] } ],
    'selector-no-vendor-prefix': true,
    'max-nesting-depth': 2,
    'color-hex-length': 'short',
    'font-family-name-quotes': 'always-unless-keyword',
    'number-leading-zero': 'always',
    'string-quotes': 'single',
    'selector-pseudo-element-colon-notation': 'double',
    'shorthand-property-no-redundant-values': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'selector-list-comma-newline-after': 'always',
    'block-no-empty': true,
    'number-max-precision': 2,
    // ===
    // PRETTIER
    // ===
    // HACK: to compensate for https://github.com/shannonmoeller/stylelint-config-prettier/issues/4
    // Modifying setting from Standard: https://github.com/stylelint/stylelint-config-standard/blob/7b76d7d0060f2e13a331806a09c2096c7536b0a6/index.js#L6
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    // ===
    // SCSS
    // ===
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': /^[a-z-]+$/,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    // Allow SCSS and CSS module keywords beginning with `@`
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
