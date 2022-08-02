module.exports = {
	env: {
    browser: true,
    node: true,
		es2022: true,
    // 'vue/setup-compiler-macros': true
  },
	parser: 'vue-eslint-parser',
  parserOptions: {
		ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.js'],
      parser: '@typescript-eslint/parser',
    }
  ],
  plugins: ['@typescript-eslint', 'vue'],
	// 忽略 src 外的文件，防止 指定的 tsconfig.json 中不包含
  // ignorePatterns: ['/**/*.*', '!src/**/*.*'],
  ignorePatterns: ['*.js', '*.html'],
	// 如果使用 AutoImport, 设置 eslintrc: { enabled: true },
  extends: ['./.eslintrc-auto-import', '@ziloen/eslint-config-vue'],
  globals: {
    __DEV__: 'readonly'
  },
	rules: {}
}