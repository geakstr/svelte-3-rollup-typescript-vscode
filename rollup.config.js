import svelte from "rollup-plugin-svelte";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import html from "rollup-plugin-bundle-html";
import typescript from "rollup-plugin-typescript2";
import tscompile from "typescript";
import { terser } from "rollup-plugin-terser";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

const plugins = [
  commonjs({ include: "node_modules/**" }),
  typescript({ typescript: tscompile }),
  svelte({
    dev: isProd ? false : true,
    extensions: [".svelte"],
    preprocess: require("./svelte.config.js").preprocess,
    css: css => css.write("build/css/style.css")
  }),
  resolve({ browser: true }),
  html({
    template: "src/index.html",
    dest: "build",
    filename: "index.html"
  })
];

if (isDev) {
  plugins.push(
    serve({
      open: false,
      openPage: "/index.html",
      historyApiFallback: "/index.html",
      contentBase: ["./build"]
    })
  );
} else if (isProd) {
  plugins.push(terser({ sourcemap: true }));
}

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    file: "build/js/main.js",
    format: "iife"
  },
  plugins
};
