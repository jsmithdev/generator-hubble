import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import {copy} from '@web/rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

// Not installed by default but can be useful:
//import html from '@web/rollup-plugin-html';
//import resolve from '@rollup/plugin-node-resolve';
//import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: './src/hello-world.ts',
  output: {
    file: './build/lit.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    typescript({
      compilerOptions: {
        lib: ["es6", "dom"],
        target: "es6",
        experimentalDecorators: true,
        useDefineForClassFields: false,
      }
    }),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
    // Optional: copy any static assets to build directory
    copy({
      patterns: [
        'resources/**/*',
        'package.json',
      ],
    }),
  ]
};