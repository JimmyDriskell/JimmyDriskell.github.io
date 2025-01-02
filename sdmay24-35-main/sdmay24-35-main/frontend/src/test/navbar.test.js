import renderer from "react-test-renderer";
import NavBar from "../routes/navbar";

jest.mock("../styles/navbar.css");
jest.mock("react-router-dom");

const renderTree = (tree) => renderer.create(tree);
describe("<NavBar>", () => {
  it("should render component", () => {
    expect(renderTree(<NavBar />).toJSON()).toMatchSnapshot();
  });
});
