import React, { useMemo } from 'react';
import * as R from 'ramda';

import { roundtenth } from '@jadesrochers/reacthelpers';
import { isBarHighlightedX } from '@jadesrochers/selectbox';
import * as fps from '@jadesrochers/fpstreamline';

import { Rect, HighlightRect } from './svgfeatures'

// Creates Histogram bars on a plot providing there is xdata
// sets ymax once it calculates it, 
// Set up for selection by default, will do nothing unless 
// the selection is hooked up on the other end.

const getBins = R.curry((data, ticks) => {
  return R.pipe(
    R.drop(1),
    R.zip(R.init(ticks)),
    R.map((bin) => ({data: R.filter((val) => val>bin[0] && val<=bin[1])(data), x0:bin[0], x1:bin[1]})),
  )(ticks)
})

const calcHistRects = R.curry((height,xscale,yscale) => R.pipe(
  R.map(bin => ({length: bin['data'].length, xmin: (xscale(bin['x0'])+0.5), xmax: xscale(bin['x1'])}) ),
  R.map(bin => ( {...bin, width: roundtenth(bin.xmax - bin.xmin - 0.5)}) ),
  R.map(bin => ( {...bin, yheight: roundtenth(yscale(bin.length)) }) ),
  R.map(bin => ( {...bin, yoffset: roundtenth(height - bin.yheight) } ) ),
  )
)

const HistBars = (props) => {
  let rectvals, hist, barmax, maxmin
  if(props.xscale && props.yscale){
    hist = getBins(props.xdata)(props.xscale.ticks(props.nbins)) 
    barmax = Math.max(...R.map(n => n.data.length)(hist))

    rectvals=calcHistRects(props.height, props.xscale, props.yscale)(hist)
    maxmin = R.map(bin => ({xmax: bin.xmax, xmin: bin.xmin}))(rectvals) 
  }else{
    barmax = 10
    maxmin = [0, 10]
  }
  useMemo(() => props.ymaxSet(barmax), [barmax])
  useMemo(() => props.setPlotData(maxmin), [barmax])
  if(! props.xscale && ! props.yscale){
    return null
  }

  const propsToChildren = R.map((bin) => (
      React.cloneElement(props.children, 
       R.mergeRight({...props},{
         key:(bin.xmin),
         fill: (props.fill ? props.fill : undefined),
         width:(bin.width), height:(bin.yheight),
         xoffset:(bin.xmin), yoffset:(bin.yoffset),
         xmax:(bin.xmax),
         children: undefined} ) 
      ))
    )(rectvals)

  return(
    <g>
      {propsToChildren}
    </g>
  )
}

const HighlightBars = (props) => {
  return(
  <HistBars {...props}>
   <HighlightRect
     highlightfill={props.highlightfill ? props.highlightfill : undefined}
     isHighlighted={props.isHighlighted ? props.isHighlighted : isBarHighlightedX}
   />
  </HistBars>
  )
}

const RegBars = (props) => {
  return(
  <HistBars {...props}>
   <Rect />
  </HistBars>
  )
}

export { HighlightBars, RegBars }
