import renderer from "react-test-renderer";
import SignUp from "../routes/signup";

jest.mock("react-router-dom");
jest.mock("axios");
jest.mock("../styles/signup.css");
jest.mock("../index.css");

const renderTree = (tree) => renderer.create(tree);
describe("<SignUp>", () => {
  it("should render component", () => {
    expect(renderTree(<SignUp />).toJSON()).toMatchSnapshot();
  });
});
