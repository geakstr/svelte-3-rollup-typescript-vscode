import { target } from "./";

describe("Entry Script", () => {
  it("target dom element should contains textContent", () => {
    expect(target.textContent).not.toBeNull();
  });
});
