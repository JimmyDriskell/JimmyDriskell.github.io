import renderer from "react-test-renderer";
import RequireAuth from "../routes/requireAuth";

jest.mock("react-router-dom");

const renderTree = (tree) => renderer.create(tree);
describe("<RequireAuth>", () => {
  it("should render component", () => {
    expect(renderTree(<RequireAuth />).toJSON()).toMatchSnapshot();
  });
});
