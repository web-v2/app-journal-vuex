module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testRunner: 'jest-jasmine2',
  transformIgnorePatterns: ["/node_modules/(?!axios)"], // Esta línea
}