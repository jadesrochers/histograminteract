import React from "react";
import * as R from "ramda";
// This is possible because of a webpack resolve alias that points
// histograminteract to ../../src/index.js
import { HistogramDataHighlight, useLimits } from "histograminteract";

const Histogram = props => {
  return (
    <div style={{ height: '200px' }} >
      <HistogramDataHighlight
        xdata={props.xdata}
        limitHook={props.limitHook}
        nbins={20}
      />
    </div>
  );
};

const DataPlot = props => {
  //let plotdatatemp = R.zip(props.data, props.locationx)
  //let plotdata = R.zip(plotdatatemp, props.locationy)
  const plotdata = R.zipWith(
    (a, b) => [...a, b],
    R.zip(props.data, props.locationx),
    props.locationy
  );

  const xmin = props.limitHook.xlimits.min;
  const xmax = props.limitHook.xlimits.max;
  return (
    <svg width="300px" height="350px" viewBox="0 0 1000 1000">
      {plotdata.map(data => {
        if (data && data[0] > xmin && data[0] < xmax) {
          return <circle cx={data[1]} cy={data[2]} r={data[0]} />;
        }
      })}
    </svg>
  );
};

const Container = props => {
  const limitHook = useLimits();
  return (
     <div       style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }} >
        <h3>Histogram linked to data plot</h3>
        <p>
          Make a selection in the histogram and <br />
          only those points will be displayed.
        </p>
        <DataPlot
          data={props.data}
          limitHook={limitHook}
          locationx={props.locationx}
          locationy={props.locationy}
        />
        <p>
          Click and drag to select; selection will be highlighted:
          <br />
          If reset fails, the cursor probably made a selection, just try again.
        </p>
        <Histogram xdata={props.data} limitHook={limitHook} />
        <h4 style={{ marginTop: 0 }}> Point Radius </h4>
      </div>
  );
};

const HistPlot = () => {
  const data = Array.from({ length: 100 }, () => Math.random() * 30 + 4);
  const locationx = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
  );
  const locationy = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
  );
  console.log("rendering Limiter");
  return <Container data={data} locationx={locationx} locationy={locationy} />;
};

export { HistPlot  };
