import renderer from "react-test-renderer";
import LandingNavBar from "../components/landingNavbar";

jest.mock("../styles/navbar.css");
jest.mock("react-router-dom");

const renderTree = (tree) => renderer.create(tree);
describe("<LandingNavBar>", () => {
  it("should render component", () => {
    expect(renderTree(<LandingNavBar />).toJSON()).toMatchSnapshot();
  });
});
