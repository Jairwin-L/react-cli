module.exports = {
	root: true,
	// 对Babel解析器的包装使其与 ESLint 兼容。
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2015, // specify the version of ECMAScript syntax you want to use: 2015 => (ES6)
		sourceType: 'module',  // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // enable JSX
			impliedStrict: true // enable global strict mode
		}
	},
	env: {
		// 预定义的全局变量，这里是浏览器环境
		browser: true,
	},
	// plugins: [
	//   // 此插件用来识别.html 和 .vue文件中的js代码
	//   'html',
	//   // standard风格的依赖包
	//   "standard",
	//   // standard风格的依赖包
	//   "promise"
	// ],
	rules: {
		"indent": ["error", "tab"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		// "no-console": "error",
		"arrow-parens": 0
	}
}