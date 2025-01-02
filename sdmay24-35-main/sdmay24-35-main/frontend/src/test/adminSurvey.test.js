import renderer from "react-test-renderer";
import AdminSurvey from "../routes/adminSurvey";

jest.mock("../components/AdminNavBar");
jest.mock("../components/footer");
jest.mock("../styles/adminEditQuestions.css");
jest.mock("react-router-dom");
jest.mock("axios");

const renderTree = (tree) => renderer.create(tree);
describe("<AdminSurvey>", () => {
  it("should render component", () => {
    expect(renderTree(<AdminSurvey />).toJSON()).toMatchSnapshot();
  });
});
