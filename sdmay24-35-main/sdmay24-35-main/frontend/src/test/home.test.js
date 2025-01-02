import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Landing from "../routes/home";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("should render landing component", () => {
  render(
    <HashRouter>
      <Landing />
    </HashRouter>
  );
  const landingElement = screen.getByText("Welcome to MySTEMGrowth Profile!");
  expect(landingElement).toBeInTheDocument();
});
