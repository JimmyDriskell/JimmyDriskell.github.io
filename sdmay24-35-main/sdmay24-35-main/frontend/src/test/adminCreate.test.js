import renderer from "react-test-renderer";
import AdminCreate from "../routes/adminCreate";

jest.mock("../components/AdminNavBar");
jest.mock("../components/footer");
jest.mock("../styles/adminResults.css");
jest.mock("react-router-dom");
jest.mock("axios");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminCreate>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminCreate />).toJSON()).toMatchSnapshot();
  });
});
