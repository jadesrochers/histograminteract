import React from 'react'
import { FigureContainer } from './figurebuilder.jsx'
import { linearYScale,  scaleHistLin, customYscale, customXscale, AxisBottom, AxisLeft } from './axes.jsx'
import { ResetButton } from './resetbutton.jsx'
import { HighlightBars } from './histbars.jsx'
import { SelectBase, SetBarxLimits, SelectXRect, MouseRect, ViewBoxConst } from '@jadesrochers/selectbox'
import { pickformatter } from '@jadesrochers/reacthelpers'

// Possible arguments:
// height/width -  affects only internal figure sizing
// viewBox      -  This configures the figure width/height ratio
// If you set the viewbox, you will likely want to set height/width
// margins      -  set margins around plot area, gives space for labels/ticks
// xdata (req)  -  data for the histogram
// nbins        -  number of bins for data; but d3 takes only as guideline

// xticks       -  number of xticks to use, also a guideline
// yticks       -  number of yticks to use, also a guideline

// xstyle       -  Style for x axis <g> element
// ystyle       -  Style for y axis <g> element

// xscale       -  Scaling for x axis
// yscale       -  Scaling for y axis

// xformatter   -  function to format tick values for x axis.
// yformatter   -  function to format tick values for y axis.

// limitHook    -  allows linking selections on histogram to other figure,
// where limits will be set to show subset of the data
const HistogramDataHighlight = (props) => {
  const formatter = pickformatter(props.xdata)
  /* console.log('Props to Histogram data highlight:', props) */
  return(
  // The sizes for Select and Figure are arbitrary but 
  // need to match to keep selection scaling accurate!
  <SelectBase width={'100%'} height={'100%'} sizex={630} sizey={110} >
    <ViewBoxConst key='viewbox'
      height={'100%'} width={'100%'} 
      viewBox={props.viewBox ? props.viewBox : '0 0 700 145'}
    >
      <FigureContainer key='figurebuilder'
        height={props.height ? props.height : 150}
        width={props.width ? props.width : 700}
        margins={{top: 10, left: 50, bottom: 30, right: 20}}
        xdata={props.xdata ? props.xdata : undefined } 
        nbins={props.nbins ? props.nbins : 25}
        xticks={props.xticks ? props.xticks : 10}
        yticks={props.yticks ? props.yticks : 6}
        limitHook={props.limitHook}
      >
       <AxisLeft key='yaxis' 
         scale={props.yscale ? props.yscale : linearYScale} 
         tickformat={props.yformatter ? props.yformatter : undefined }
         style={props.ystyle ? props.ystyle : undefined }
       />
       <AxisBottom key='xaxis' 
         scale={props.xscale ? props.xscale : scaleHistLin} 
         tickformat={props.xformatter ? props.xformatter : formatter}
         style={props.xstyle ? props.xstyle : undefined }
       />
       <HighlightBars key='histogram' 
         fill={props.fill ? props.fill : '#48c9b0'}
         highlightfill={props.highlightfill ? props.highlightfill : '#3498db'}
       />
       <SetBarxLimits key='limitsetter' > 
         <SelectXRect key='selectiondraw' />
         <MouseRect key='mousecapture' />
       </SetBarxLimits>
       <ResetButton key='resetbutton' 
         buttonwidth={100} 
         xoffset={270} yoffset={1}
       />
     </FigureContainer>
   </ViewBoxConst>
 </SelectBase>
 )
}

export { HistogramDataHighlight }
