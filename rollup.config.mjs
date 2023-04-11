import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";
import filesize from 'rollup-plugin-filesize';


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
        nodeResolve(),
        commonjs(),
        terser(),
        filesize(),
    ]
}
