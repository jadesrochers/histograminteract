import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
    input: './index.js',
    external: ['react', 'react-dom', 'ramda'],
    output: [
      {
          file: './build/cjs.js',
          format: 'cjs',
          name: 'bundle',
      },
      {
          file: './build/esm.js',
          format: 'esm',
      },
      {
        file: './build/iife.js',
        format: 'iife',
        name: 'bundle',
        globals: {
          'ramda': 'ramda',
          'react': 'React'
        }
      }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
        filesize(),
    ]
}
