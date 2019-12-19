/** @jsx jsx */
import React, { useState } from 'react';
import * as R from 'ramda';
import { jsx } from '@emotion/core';

import * as fps from '@jadesrochers/fpstreamline';

const getFigHeight = (height, margins) => ( height - margins.top - margins.bottom )
const getFigWidth = (width, margins) => ( width - margins.left - margins.right )

// Arguments to FigureContainer - Need at the least width/height, margins.
// xdata/ydata/zdata all depends on what the children are and need
// ticks is a good idea so you get reasonable labels.

// The purpose of the FigureContainer is to provide resources
// to all child elements, but not to coordinate or know what they do. 
// setPlotData - tracking when data is set 
// ysetScale, xsetScale - Allow child elements to set the scaling
// ymaxSet - For setting y max When y data is derived, like in histogram
// All props to the container are also passed. 
const FigureContainer = (props) => {

  const [plotData, setPlotData] = useState(undefined)
  const [xscale, xscaleSet] = useState(undefined)
  const [yscale, yscaleSet] = useState(undefined)
  const [ymax, ymaxSet] = useState(10)

  if(! props.xdata){ return null }

  let height, width
  height = getFigHeight(props.height, props.margins)
  width = getFigWidth(props.width, props.margins)

  const pass = R.dissoc('children',props)
  const propsToChildren = R.map(child => {
    return React.cloneElement(child, 
     {...pass, height, width, 
      xscale, xscaleSet, yscale, yscaleSet, 
      ymaxSet, ymax, setPlotData, plotData,
      })
  })(fps.toArray(props.children))

  return (
   <React.Fragment>
   <g transform={`translate(${props.margins.left},${props.margins.top})`} 
   >
       { propsToChildren }
   </g>
   </React.Fragment>
  )
}

export { FigureContainer }
