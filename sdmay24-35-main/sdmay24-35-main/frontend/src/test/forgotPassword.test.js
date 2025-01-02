import renderer from "react-test-renderer";
import ForgotPassword from "../routes/forgotPassword";

jest.mock("../styles/about.css");
jest.mock("../components/landingNavbar");

const renderTree = (tree) => renderer.create(tree);
describe("<ForgotPassword>", () => {
  it("should render component", () => {
    expect(renderTree(<ForgotPassword />).toJSON()).toMatchSnapshot();
  });
});
