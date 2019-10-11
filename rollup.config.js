import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
  },
  plugins: [resolve(), commonjs()],
};
