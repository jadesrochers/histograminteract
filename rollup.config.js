import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/index.js',
    external: ['react', '@emotion/react', '@jadesrochers/reacthelpers', '@reach/router', 'ramda' ],
    output: [
      {
          format: 'umd',
          file: './dist/histogram-umd.js',
          name: 'histogram',
      },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs(),
        terser(),
        filesize(),
    ]
}
