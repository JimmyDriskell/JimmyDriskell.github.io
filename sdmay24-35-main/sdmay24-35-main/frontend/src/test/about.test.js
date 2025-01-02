import React from "react";
import { render } from "@testing-library/react";
import About from "../routes/about";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders About component", () => {
  const { getByText } = render(
    <HashRouter>
      <About />
    </HashRouter>
  );

  const researchEfficacyText = getByText("MySTEMGrowth Profile");
  expect(researchEfficacyText).toBeInTheDocument();
});
