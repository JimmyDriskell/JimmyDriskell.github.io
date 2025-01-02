import renderer from "react-test-renderer";
import AdminHome from "../routes/adminHome";

jest.mock("../components/AdminNavBar");
jest.mock("../components/footer");
jest.mock("../styles/adminHome.css");
jest.mock("react-router-dom");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminHome>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminHome />).toJSON()).toMatchSnapshot();
  });
});
