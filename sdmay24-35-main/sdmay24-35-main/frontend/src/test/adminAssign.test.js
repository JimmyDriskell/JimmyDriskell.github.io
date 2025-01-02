import renderer from "react-test-renderer";
import React, { useState } from "react";

import AdminAssign from "../routes/adminAssign";

jest.mock("../styles/home.css");
jest.mock("../index.css");
jest.mock("../components/footer");
jest.mock("../components/AdminNavBar");
jest.mock("react-router-dom");
jest.mock("axios");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminAssign>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminAssign />).toJSON()).toMatchSnapshot();
  });
});
