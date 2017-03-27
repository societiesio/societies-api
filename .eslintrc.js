module.exports = {
  extends: 'standard',
  rules: {
    'max-len': ['warn', { code: 80 }],
    'no-confusing-arrow': ['error', { 'allowParens': true }],
    'strict': ['error', 'global']
  }
}
