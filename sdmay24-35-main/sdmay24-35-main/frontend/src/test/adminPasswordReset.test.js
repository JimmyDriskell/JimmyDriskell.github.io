import renderer from "react-test-renderer";
import React, { useState } from "react";
import AdminPasswordReset from "../routes/adminPasswordReset";

jest.mock("../styles/home.css");
jest.mock("../index.css");
jest.mock("../components/AdminNavBar");
jest.mock("../components/footer");
jest.mock("react-router-dom");
jest.mock("axios");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminPasswordReset>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminPasswordReset />).toJSON()).toMatchSnapshot();
  });
});
