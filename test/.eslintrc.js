'use strict';

const mitmaroEslintConfig = require('eslint-config-mitmaro');

module.exports = mitmaroEslintConfig(
	[
		'mocha',
		'chai',
	],
);
