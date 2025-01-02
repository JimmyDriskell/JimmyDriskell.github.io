import anychart from "anychart";
import { drawBubbleChart, drawBarChart } from "../functions/graph";

jest.mock("anychart", () => {
  return {
    cartesian: jest.fn(() => ({
      maxBubbleSize: jest.fn(),
      minBubbleSize: jest.fn(),
      bubble: jest.fn(() => ({
        normal: jest.fn(() => ({
          fill: jest.fn(),
          stroke: jest.fn(),
        })),
      })),
      draw: jest.fn(),
      container: jest.fn(),
      xAxis: jest.fn(() => ({
        labels: jest.fn(() => ({
          wordWrap: jest.fn(),
          wordBreak: jest.fn(),
          hAlign: jest.fn(),
          width: jest.fn(),
          fontSize: jest.fn(),
        })),
      })),
      yAxis: jest.fn(),
      interactivity: jest.fn(() => ({
        selectionMode: jest.fn(),
        zoomOnMouseWheel: jest.fn(),
      })),
      tooltip: jest.fn(),
      width: jest.fn(),
      height: jest.fn(),
      yScale: jest.fn(),
      padding: jest.fn(),
    })),
    scales: {
      linear: jest.fn(() => ({
        minimum: jest.fn(),
        maximum: jest.fn(),
        ticks: jest.fn(() => ({
          set: jest.fn(),
        })),
      })),
    },
    column: jest.fn(() => ({
      column: jest.fn(() => ({
        normal: jest.fn(() => ({
          fill: jest.fn(),
          stroke: jest.fn(),
          name: jest.fn(),
        })),
        fill: jest.fn(),
      })),
      barsPadding: jest.fn(),
      barGroupsPadding: jest.fn(),
      draw: jest.fn(),
      container: jest.fn(),
      xAxis: jest.fn(() => ({
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
      yScale: jest.fn(),
      padding: jest.fn(),
    })),
    charts: {
      Cartesian: jest.fn(),
    },
  };
});

describe("Chart Functions", () => {
  let chart; // Declare chart variable

  beforeEach(() => {
    chart = null; // Reset chart before each test
    document.getElementById = jest.fn().mockReturnValue({ innerHTML: "" });
  });

  it("drawBubbleChart should create a bubble chart", () => {
    const dataSet = {
      groupAverages: {
        group_1_average: 3.5,
        group_2_average: 4.2,
        group_3_average: 2.8,
        group_4_average: 5.0,
        group_5_average: 3.9,
        group_6_average: 4.6,
      },
    };
    const comparisonData = null; // Provide comparison data if needed

    const containerId = "bubbleContainer"; // Mock container ID

    expect(() => {
      chart = drawBubbleChart(chart, dataSet, comparisonData, containerId);
    }).not.toThrow();

    expect(chart).not.toBeNull(); // Check if chart object is created
  });

  it("drawBarChart should create a bar chart", () => {
    const dataSet = {
      groupAverages: {
        group_1_average: 3.5,
        group_2_average: 4.2,
        group_3_average: 2.8,
        group_4_average: 5.0,
        group_5_average: 3.9,
        group_6_average: 4.6,
      },
    };
    const comparisonData = null; // Provide comparison data if needed

    expect(() => {
      chart = drawBarChart(chart, dataSet, comparisonData);
    }).not.toThrow();

    expect(chart).not.toBeNull(); // Check if chart object is created
  });
});
