import React from "react";
import { render, screen } from "@testing-library/react";
import Results from "../routes/profile";
import "@testing-library/jest-dom";

jest.mock("../routes/navbar", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock any modules or components used by Results
jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("anychart", () => ({
  __esModule: true,
  default: {
    licenseKey: jest.fn(),
    cartesian: jest.fn(() => ({
      maxBubbleSize: jest.fn(),
      minBubbleSize: jest.fn(),
      bubble: jest.fn(() => ({
        normal: jest.fn(),
      })),
      xAxis: jest.fn(() => ({
        title: jest.fn(),
        labels: jest.fn(() => ({
          wordWrap: jest.fn(),
          wordBreak: jest.fn(),
          hAlign: jest.fn(),
          width: jest.fn(),
          fontSize: jest.fn(),
        })),
      })),
      interactivity: jest.fn(() => ({
        selectionMode: jest.fn(),
        zoomOnMouseWheel: jest.fn(),
      })),
      tooltip: jest.fn(),
      width: jest.fn(),
      height: jest.fn(),
      container: jest.fn(),
      draw: jest.fn(),
      dispose: jest.fn(),
    })),
    column: jest.fn(() => ({
      normal: jest.fn(),
    })),
  },
}));

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Results component", () => {
  it("renders correctly and triggers actions", async () => {
    render(<Results />);

    // Check that loading message is displayed initially
    const res = screen.getByText("loading...");
    expect(res).toBeInTheDocument();

    // Mock Axios response data
    const mockData = {
      data: {
        data: [
          {
            groupAverages: {
              group_1_average: 5.5,
              group_2_average: 5.5,
              group_3_average: 5.5,
              group_4_average: 5.5,
              group_5_average: 5.5,
              group_6_average: 5.5,
            },
          },
        ],
      },
    };
  });
});
