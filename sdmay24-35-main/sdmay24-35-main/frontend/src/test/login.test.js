import renderer from "react-test-renderer";
import Login from "../routes/login";

jest.mock("react-router-dom");
jest.mock("axios");
jest.mock("../styles/login.css");

const renderTree = (tree) => renderer.create(tree);
describe("<Login>", () => {
  it("should render component", () => {
    expect(renderTree(<Login />).toJSON()).toMatchSnapshot();
  });
});
