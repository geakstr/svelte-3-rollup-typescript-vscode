const deasync = require("deasync");
const rollup = require("rollup");

const config = require("./rollup.config.js");

exports.process = (...args) => {
  const [, input] = args;
  const compiled = {};
  rollup
    .rollup({ input, plugins: config.plugins })
    .then(bundle => bundle.generate({ format: "cjs", sourcemap: true }))
    .then(({ output }) =>
      output.reduce((carry, record) => Object.assign(carry, record), compiled)
    )
    .catch(error => {
      throw error;
    });
  let count = 0;
  while (compiled === undefined || !compiled.code || !compiled.map) {
    if (count++ >= 500) {
      throw new Error("Can't compile svelte component for test");
    }
    deasync.runLoopOnce();
  }
  return compiled;
};
