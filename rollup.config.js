import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			exports: 'named',
			sourcemap: true,
		},
	],
	plugins: [
		external(),
		resolve(),
		typescript({
			rollupCommonJSResolveHack: true,
			exclude: ['**/__tests__/**', '**/*.stories.tsx'],
			clean: true,
		}),
		commonjs({
			include: [/node_modules/],
			namedExports: {
				'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
				'node_modules/react-dom/index.js': ['render'],
				'prop-types': [
					'array',
					'bool',
					'func',
					'number',
					'object',
					'string',
					'symbol',
					'any',
					'arrayOf',
					'element',
					'elementType',
					'instanceOf',
					'node',
					'objectOf',
					'oneOf',
					'oneOfType',
					'shape',
					'exact',
				],
				'node_modules/react-is/index.js': [
					'isElement',
					'isValidElementType',
					'ForwardRef',
					'Memo',
					'isFragment',
				],
			},
		}),
	],
};
