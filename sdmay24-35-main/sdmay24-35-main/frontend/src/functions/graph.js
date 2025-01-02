import anychart from "anychart";

export const drawBubbleChart = (chart, dataSet, comparisonData, container) => {
  if (!dataSet) return;

  var data1 = [
    {
      x: "Civic\nEngagement\nBehaviors",
      y: Math.round(dataSet.groupAverages.group_1_average * 2) / 2,
      size: 10,
    },
    {
      x: "STEM\nInterests",
      y: Math.round(dataSet.groupAverages.group_2_average * 2) / 2,
      size: 10,
    },
    {
      x: "STEM\nSelf\nEfficacy",
      y: Math.round(dataSet.groupAverages.group_3_average * 2) / 2,
      size: 10,
    },
    {
      x: "STEM\nOutcome\nExpectations",
      y: Math.round(dataSet.groupAverages.group_4_average * 2) / 2,
      size: 10,
    },
    {
      x: "Research\nOutcome\nExpectations",
      y: Math.round(dataSet.groupAverages.group_5_average * 2) / 2,
      size: 10,
    },
    {
      x: "Research\nSelf\nEfficacy",
      y: Math.round(dataSet.groupAverages.group_6_average * 2) / 2,
      size: 10,
    },
  ];

  var data2 = [
    {
      x: "Civic\nEngagement\nBehaviors",
      y: Math.round(dataSet.groupAverages.group_1_average * 2) / 2,
      size: dataSet.groupAverages.group_1_average,
      color: "#bf5fffff",
    },
    {
      x: "STEM\nInterests",
      y: Math.round(dataSet.groupAverages.group_2_average * 2) / 2,
      size: dataSet.groupAverages.group_2_average,
      color: "#4a86e8ff",
    },
    {
      x: "STEM\nSelf\nEfficacy",
      y: Math.round(dataSet.groupAverages.group_3_average * 2) / 2,
      size: dataSet.groupAverages.group_3_average,
      color: "#ff0000ff",
    },
    {
      x: "STEM\nOutcome\nExpectations",
      y: Math.round(dataSet.groupAverages.group_4_average * 2) / 2,
      size: dataSet.groupAverages.group_4_average,
      color: "#ff9900ff",
    },
    {
      x: "Research\nOutcome\nExpectations",
      y: Math.round(dataSet.groupAverages.group_5_average * 2) / 2,
      size: dataSet.groupAverages.group_5_average,
      color: "#93c47dff",
    },
    {
      x: "Research\nSelf\nEfficacy",
      y: Math.round(dataSet.groupAverages.group_6_average * 2) / 2,
      size: dataSet.groupAverages.group_6_average,
      color: "#fff16eff",
    },
  ];

  if (chart) {
    chart.dispose();
  }

  document.getElementById(container).innerHTML = "";
  chart = anychart.cartesian();
  chart.maxBubbleSize("10%");
  chart.minBubbleSize("5%");

  if (comparisonData) {
    var data3 = [
      {
        x: "Civic\nEngagement\nBehaviors",
        y: Math.round(comparisonData.groupAverages.group_1_average * 2) / 2,
        size: comparisonData.groupAverages.group_1_average,
        color: "#808080",
      },
      {
        x: "STEM\nInterests",
        y: Math.round(comparisonData.groupAverages.group_2_average * 2) / 2,
        size: comparisonData.groupAverages.group_2_average,
        color: "#808080",
      },
      {
        x: "STEM\nSelf\nEfficacy",
        y: Math.round(comparisonData.groupAverages.group_3_average * 2) / 2,
        size: comparisonData.groupAverages.group_3_average,
        color: "#808080",
      },
      {
        x: "STEM\nOutcome\nExpectations",
        y: Math.round(comparisonData.groupAverages.group_4_average * 2) / 2,
        size: comparisonData.groupAverages.group_4_average,
        color: "#808080",
      },
      {
        x: "Research\nOutcome\nExpectations",
        y: Math.round(comparisonData.groupAverages.group_5_average * 2) / 2,
        size: comparisonData.groupAverages.group_5_average,
        color: "#808080",
      },
      {
        x: "Research\nSelf\nEfficacy",
        y: Math.round(comparisonData.groupAverages.group_6_average * 2) / 2,
        size: comparisonData.groupAverages.group_6_average,
        color: "#808080",
      },
    ];

    var data4 = [
      {
        x: "Civic\nEngagement\nBehaviors",
        y: Math.round(comparisonData.groupAverages.group_1_average * 2) / 2,
        size: 10,
      },
      {
        x: "STEM\nInterests",
        y: Math.round(comparisonData.groupAverages.group_2_average * 2) / 2,
        size: 10,
      },
      {
        x: "STEM\nSelf\nEfficacy",
        y: Math.round(comparisonData.groupAverages.group_3_average * 2) / 2,
        size: 10,
      },
      {
        x: "STEM\nOutcome\nExpectations",
        y: Math.round(comparisonData.groupAverages.group_4_average * 2) / 2,
        size: 10,
      },
      {
        x: "Research\nOutcome\nExpectations",
        y: Math.round(comparisonData.groupAverages.group_5_average * 2) / 2,
        size: 10,
      },
      {
        x: "Research\nSelf\nEfficacy",
        y: Math.round(comparisonData.groupAverages.group_6_average * 2) / 2,
        size: 10,
      },
    ];

    var series4 = chart.bubble(data4);
    series4.normal().fill(null);
    series4.normal().stroke("#808080", 1, "10 5", "round");

    chart.bubble(
      data3.map((point) => ({
        x: point.x,
        y: point.y,
        size: point.size,
        fill: point.color,
        stroke: null,
      }))
    );
  }

  var data5 = [{ x: "Civic\nEngagement\nBehaviors", y: 2, size: 1 }];
  var series5 = chart.bubble(data5);
  series5.normal().fill(null);
  series5.normal().stroke(null);

  var series1 = chart.bubble(data1);
  series1.normal().fill(null);
  series1.normal().stroke("#808080", 1, "10 5", "round");

  chart.bubble(
    data2.map((point, i) => ({
      x: point.x,
      y: point.y,
      size: point.size,
      fill: point.color,
      stroke: null,
      hatchFill:
        comparisonData &&
        Math.round(dataSet.groupAverages["group_" + (i + 1) + "_average"] * 2) /
          2 ==
          Math.round(
            comparisonData.groupAverages["group_" + (i + 1) + "_average"] * 2
          ) /
            2
          ? { color: "#808080", size: 4, thickness: 3 }
          : null,
    }))
  );

  var xLabels = chart.xAxis().labels();
  xLabels.wordWrap("break-word");
  xLabels.wordBreak("break-all");
  xLabels.hAlign("center");
  xLabels.width(60);
  xLabels.fontSize(8);
  chart.interactivity().selectionMode("none");
  chart.interactivity().zoomOnMouseWheel(false);
  chart.tooltip(false);
  chart.width("100%");
  chart.height("100%");
  var scale = anychart.scales.linear();
  scale.minimum(0);
  scale.maximum(12);
  var ticks = scale.ticks();

  var ticksArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ticks.set(ticksArray);
  chart.yScale(scale);
  chart.padding([10, 20, 10, 20]);
  chart.container(container);
  chart.draw();
  return chart;
};

export const drawBarChart = (chart, dataSet, comparisonData) => {
  var data2 = [
    {
      x: "Civic\nEngagement\nBehaviors",
      y: dataSet.groupAverages.group_1_average,
      color: "#bf5fffff",
    },
    {
      x: "STEM\nInterests",
      y: dataSet.groupAverages.group_2_average,
      color: "#4a86e8ff",
    },
    {
      x: "STEM\nSelf\nEfficacy",
      y: dataSet.groupAverages.group_3_average,
      color: "#ff0000ff",
    },
    {
      x: "STEM\nOutcome\nExpectations",
      y: dataSet.groupAverages.group_4_average,
      color: "#ff9900ff",
    },
    {
      x: "Research\nOutcome\nExpectations",
      y: dataSet.groupAverages.group_5_average,
      color: "#93c47dff",
    },
    {
      x: "Research\nSelf\nEfficacy",
      y: dataSet.groupAverages.group_6_average,
      color: "#fff16eff",
    },
  ];

  if (chart) {
    chart.dispose();
  }
  document.getElementById("container").innerHTML = "";

  chart = anychart.column();

  if (comparisonData) {
    var data1 = [
      {
        x: "Civic\nEngagement\nBehaviors",
        y: comparisonData.groupAverages.group_1_average,
        color: "#808080",
      },
      {
        x: "STEM\nInterests",
        y: comparisonData.groupAverages.group_2_average,
        color: "#808080",
      },
      {
        x: "STEM\nSelf\nEfficacy",
        y: comparisonData.groupAverages.group_3_average,
        color: "#808080",
      },
      {
        x: "STEM\nOutcome\nExpectations",
        y: comparisonData.groupAverages.group_4_average,
        color: "#808080",
      },
      {
        x: "Research\nOutcome\nExpectations",
        y: comparisonData.groupAverages.group_5_average,
        color: "#808080",
      },
      {
        x: "Research\nSelf\nEfficacy",
        y: comparisonData.groupAverages.group_6_average,
        color: "#808080",
      },
    ];
    const series1 = chart.column(
      data1.map((point) => ({
        x: point.x,
        y: point.y,
      }))
    );
    series1.normal().fill(null);
    series1.normal().stroke("#808080");
    series1.fill("#808080");
  }

  const series2 = chart.column(
    data2.map((point) => ({
      x: point.x,
      y: point.y,
      fill: point.color,
      stroke: "#000000",
    }))
  );

  series2.fill("#4a86e8ff");
  chart.barsPadding(0.1);
  chart.barGroupsPadding(2);
  var xLabels = chart.xAxis().labels();
  xLabels.wordWrap("break-word");
  xLabels.wordBreak("break-all");
  xLabels.hAlign("center");
  xLabels.width(60);
  xLabels.fontSize(8);

  chart.interactivity().selectionMode("none");
  chart.interactivity().zoomOnMouseWheel(false);
  chart.tooltip(false);
  var scale = anychart.scales.linear();
  scale.minimum(0);
  scale.maximum(12);
  var ticks = scale.ticks();

  var ticksArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ticks.set(ticksArray);
  chart.yScale(scale);

  chart.width("100%");
  chart.height("100%");

  chart.container("container");
  chart.draw();
};
