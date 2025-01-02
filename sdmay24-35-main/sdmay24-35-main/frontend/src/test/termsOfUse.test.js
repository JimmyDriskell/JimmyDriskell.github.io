import renderer from "react-test-renderer";
import TermsOfUse from "../routes/termsOfUse";
import useAuth from "../hooks/useAuth";
import { HashRouter } from "react-router-dom";

jest.mock("../styles/about.css");
jest.mock("../hooks/useAuth"); // Mock the useAuth hook

const renderTree = (tree) => renderer.create(tree);
describe("<TermsOfUse>", () => {
  beforeEach(() => {
    // Mock the useAuth hook to return an object with the role property
    useAuth.mockReturnValue({
      auth: {
        accessToken: "mockAccessToken",
        role: "admin", // Mocking the role property
      },
    });
  });
  it("should render component", () => {
    expect(
      renderTree(
        <HashRouter>
          <TermsOfUse />
        </HashRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
