import renderer from "react-test-renderer";
import Home from "../routes/landing";

jest.mock("../styles/landing.css");
jest.mock("../index.css");
jest.mock("../components/landingNavbar");

const renderTree = (tree) => renderer.create(tree);
describe("<Home>", () => {
  it("should render component", () => {
    expect(renderTree(<Home />).toJSON()).toMatchSnapshot();
  });
});
