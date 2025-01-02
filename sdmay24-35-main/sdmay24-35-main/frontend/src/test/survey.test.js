import renderer from "react-test-renderer";
import Survey from "../routes/survey";

jest.mock("react-router-dom");
jest.mock("axios");
jest.mock("../styles/survey.css");

const renderTree = (tree) => renderer.create(tree);
describe("<Survey>", () => {
  it("should render component", () => {
    expect(renderTree(<Survey />).toJSON()).toMatchSnapshot();
  });
});
