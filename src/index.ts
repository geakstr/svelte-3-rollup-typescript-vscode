import App from "./App.svelte";

export const target = document.body;

export const app = new App({
  target,
  props: {
    name: "World"
  }
});
