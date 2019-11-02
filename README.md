## Histograminteract allows a histogram to select data  
The point of this library is to allow selection of data on a histogram  
to then change the display of data in a linked figure, plot, or illustration.  
#### The use is when interactivity is desired -  
There are plenty of plot libraries with a histogram, this one 
is specifically for making it interactive.  

### How to get it set up  
Getting the histogram set up is pretty simple, linking it to other data  
takes some more work.  
```javascript
import { HistogramDataHighlight } from "@jadesrochers/histograminteract";
const Histogram = props => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <HistogramDataHighlight
        xdata={props.xdata}
        limitHook={props.limitHook}
        nbins={20}
      />
    </div>
  );
};
```
#### Configuring the histogram -  
Here are some arguments it can take for configuration:  
1. fill - fill color for the histogram bars.
2. highlightfill - The bar color to switch to when a bar is highlighted.  
3. nbins - desired number of histogram bins. Uses d3, and this gives it a 
guideline, it picks what it sees as a good value, sometimes not very close.  
4. xticks - how many x ticks to draw  
5. yticks - how many y ticks to draw  
6. tickformat - a function to format the tick values  

#### Linking with other data -  
The histogram needs to be set up with data that is shared to another  
display.  
I have a codesandbox that illustrates this:  
[Plot of svg circles; radius is the shared data](https://codesandbox.io/s/histogram-linked-selectionreact-8u6m8)
#### How to get it working  
The data is randomized, and is lifted a level up so it does not get  
regenerated when selections are made.  
You need to pass a limitHook to the histogram and linked figure, and then  
use the values in the hook to configure data display.  
**The histogram does this automatically**  
The limitHook is known to the histogram, and it will use it. The figure you  
want linked has to use the 
limitHook.xlimits.min -and- limitHook.xlimits.max  
to determine what data to display.  
#### Some example code:  
```javascript
const Limiter = () => {
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

const Container = props => {
  const limitHook = useLimits();
  return (
    <div
      style={{
        height: "100%",
        width: "100%"
      }}
    >
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
```
