const svelte = require("rollup-plugin-svelte");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const serve = require("rollup-plugin-serve");
const html = require("rollup-plugin-bundle-html");
const typescript = require("rollup-plugin-typescript2");
const tscompile = require("typescript");
const { terser } = require("rollup-plugin-terser");
const livereload = require("rollup-plugin-livereload");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const plugins = [
  commonjs({ include: "node_modules/**" }),
  typescript({ typescript: tscompile }),
  svelte({
    dev: isProd ? false : true,
    extensions: [".svelte"],
    preprocess: require("./svelte.config.js").preprocess,
    css: isTest ? false : css => css.write("build/css/style.css")
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
    }),
    livereload({
      watch: "build"
    })
  );
} else if (isProd) {
  plugins.push(terser({ sourcemap: true }));
}

module.exports = {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    name: "main",
    file: "build/js/main.js",
    format: "iife"
  },
  plugins
};
