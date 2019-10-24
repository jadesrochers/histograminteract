import React from 'react'
import { FigureContainer } from './figurebuilder'
import { linearYScale,  scaleHistLin, AxisBottom, AxisLeft } from './axes'
import { ResetButton } from './resetbutton'
import { HighlightBars } from './histbars'
import { SelectBase, SetBarxLimits, SelectXRect, MouseRect, ViewBoxConst } from '@jadesrochers/selectbox'
import { pickformatter } from '@jadesrochers/reacthelpers'

const HistogramDataHighlight = (props) => {
  const formatter = pickformatter(props.xdata)
  return(
  // The sizes for Select and Figure are arbitrary but 
  // need to match to keep selection scaling accurate!
  <SelectBase width={'90%'} height={'95%'} sizex={630} sizey={110} >
    <ViewBoxConst key='viewbox'
      height={'85%'} width={'100%'} 
      viewBox={'0 0 700 145'}
    >
      <FigureContainer key='figurebuilder'
        height={props.height ? props.height : 150}
        width={props.width ? props.width : 700}
        margins={{top: 10, left: 50, bottom: 30, right: 20}}
        xdata={props.xdata ? props.xdata : undefined } 
        nbins={props.nbins ? props.nbins : 25}
        xticks={props.xticks ? props.xticks : 10}
        yticks={props.yticks ? props.yticks : 6}
        tickformat={formatter}
        limitHook={props.limitHook}
      >
       <AxisLeft key='yaxis' scale={linearYScale} />
       <AxisBottom key='xaxis' scale={scaleHistLin} />
       <HighlightBars key='histogram' fill='#48c9b0'  highlightfill='#3498db' />
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
