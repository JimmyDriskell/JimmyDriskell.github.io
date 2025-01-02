import renderer from "react-test-renderer";
import AdminResults from "../routes/adminResults";

jest.mock("react-router-dom");
jest.mock("../components/AdminNavBar");
jest.mock("../components/footer");
jest.mock("axios");
jest.mock("../styles/adminResults.css");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminResults>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminResults />).toJSON()).toMatchSnapshot();
  });
});
