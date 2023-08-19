import React, { useMemo, useEffect } from 'react';
import * as R from 'ramda';
import { format } from 'd3-format';
import { scaleLinear } from 'd3-scale';
import { roundtenth } from '@jadesrochers/reacthelpers';
import styles from "./axes.modules.css";

const getTickLabels = R.curry((scale, nticks, formatter=format('.2~f')) => {
  const ticks = scale.nice(nticks).ticks(nticks)
  const scaled = R.map(n => Math.round(n*10)/10)(R.map(scale)(ticks))
  const formatted = R.map(formatter)(ticks)  
  return { scaled, formatted }
})

// Note with scales:
// The scales are exported from axes.js and passed as args to the
// axes you use so that is is configurable. They are used in here, 
// but only generically as passed args.
const linearYScale = (props) => {
  const ymax = props.ydata ? Math.max(...props.ydata) : props.ymax
  return scaleLinear().domain([0,ymax]).range([0,props.height])
}

const scaleHistLin = (props) => {
  const max = Math.max(...props.xdata) * (1+1/props.nbins)
  return scaleLinear().domain([0,max]).range([0,props.width])
}

const customYscale = R.curry((yscale, min, max, props) => {
  const ymin = min ? min : 0 
  const ymax = max ? max : (props.ydata ? Math.max(...props.ydata) : props.ymax)
  return yscale().domain([ymin,ymax]).range([0,props.height])
})

const customXscale = R.curry((xscale, min, max, props) => {
  const xmin = min ? min : 0 
  const xmax = max ? max : Math.max(...props.xdata) * (1+1/props.nbins)
  return xscale().domain([xmin,xmax]).range([0,props.width])
})

const symLogscale = R.curry((symscale, min, anchor, max, props, isX=true) => {
  const dmin = min ? min : 0 
  const dmax = max ? max : ( isX ? Math.max(...props.xdata) * (1+1/props.nbins) : Math.max(...props.ydata) )
  const rangemax = isX ? Math.max(...props.xdata) : Math.max(...props.ydata)
  return symscale().domain([dmin,dmax]).constant(anchor).range([0,rangemax])
})

const TickLine = ({stroke, length, ...other}) => {
  stroke = stroke ? stroke : '#000' 
  return(
    <line 
      className={styles.ticklineRendering}
      stroke={stroke} 
      {...other}  
      // css={{ shapeRendering: "geometricPrecision"}}
      />
  )
}

const Gtext = ({fill, label, ...other}) => {
  fill = fill ? fill : '#000' 
  // Use y/dy for Bottomaxis, x/dx for side axes.
  return(
   <text fill={fill} {...other} >
     {label}
   </text>
  )
}

const Tick = ({stroke, offset, label, line, text}) => {
  let trans = `translate(0,${offset})`
  if(line.y2){
    trans = `translate(${offset},0)`
  }
  return(
    <g transform={trans}  >
      <TickLine 
        stroke={stroke}
        {...line}
      />
      <Gtext 
        fill={stroke}
        label={label} 
        {...text}
      />
    </g>
  )
}

const TickSet = ({ticks, ...other}) => {
  return(
    R.map(([off, lab]) => ( 
    <Tick {...other} 
      key={off} 
      label={lab}
      offset={off}
    />))(ticks)
  )
}

// Dumb just means there is no scaling and it takes a guess
// at how to space the ticks based on the width or height arg
const TickDumbSet = ({ticks, ...other}) => {
  const stackvert = other.stackvert ? other.stackvert : false 
  let offset = 0;
  const format = other.format ? other.format : ((n) => n)
  return(
    R.map((lab) => { 
    offset=(stackvert ? (offset+other.height) : (offset+other.width))
    return(
    <Tick {...other} 
      key={offset} 
      label={format(lab)}
      offset={offset}
    />)
    })
   )(ticks)
}

// axis bottom will assume it is for X data and do all tick, limits, and
// scaling accordingly (using xdata).
// Also sets up the ticks and text to be aligned below the axis.
const AxisBottom = (props) => {
  const xscale = props.scale(props)
  const { scaled, formatted } = getTickLabels(xscale, props.xticks, props.tickformat)
  const ticks = R.zip(scaled, formatted)
  const defaultStyle = {stroke: '#000000'}
  const data0 = props.xdata[0]
  useEffect(() => {
    props.limitHook && props.limitHook.setXscale(() => xscale)
    props.xscaleSet(() => xscale)
    props.limitHook && props.limitHook.setRawLims('x',[Math.max(...props.xdata),Math.min(...props.xdata)])
  }, [props.xdata.length, data0])  
 
  return (
    <g  
      transform={`translate(0,${props.height})`} 
      style={ props.style ? props.style : {fontSize: '0.8rem'}} >
      <line 
      x1={-1} y1={1} x2={props.width} y2={1} 
      style={props.linestyle ? props.linestyle : defaultStyle} 
      classNames={styles.axesbottomRendering}
      // css={{ shapeRendering: "geometricPrecision"}} 
      />
      <TickSet 
        ticks={ticks}
        line={{
          y2: 6
        }}
        text={{
          // anchors middle of text to midpoint left to right
          style: {textAnchor: 'middle'},
          y: 6,
          dy: '0.9em'
        }}
      />
    </g>
  )
}

// AxisLeft looks for y data but will operate without it as long as
// some other child sets the ymax value. If that is not set, uses a default.
// Sets up the ticks outside and to the left using what is know about ydata.
// Not configured to deal with Y data only charts like horizontal bars. 
const AxisLeft = (props) => {
  const yscale = props.scale(props)
  const { scaled, formatted } = getTickLabels(yscale, props.yticks, props.tickformat)
  const ticks =  R.zip(R.map((n) => Math.round((scaled[scaled.length-1] - n)*10)/10 + 1,R.reverse(scaled)), R.reverse(formatted))
  const defaultStyle = {stroke: '#000000'}
  useEffect(() => {
    props.yscaleSet(() => yscale)
    props.ydata && props.limitHook.setRawLims('y',[Math.max(...props.ydata),Math.min(...props.ydata)])
  }, [props.ydata, props.ymax])  
 
  return (
    <g textAnchor='end' 
      style={ props.style ? props.style : {fontSize: '0.8rem'}} 
      >
      <line 
      x1={0} y1={props.height} x2={0} y2={0}
      style={props.linestyle ? props.linestyle : defaultStyle}
      className={styles.axesleftRendering}
      // css={{ shapeRendering: "geometricPrecision"}}
      />
      <TickSet 
        ticks={ticks}
        line={{ x2: -6 }}
        text={{
          style: {dominantBaseline: 'mathematical'},
          x: -6, 
          dx: '-0.4em'
        }}
      />
    </g>
  )
}

export { customYscale, customXscale, linearYScale, scaleHistLin, AxisBottom, AxisLeft, Tick, TickSet, TickDumbSet, TickLine, Gtext, getTickLabels }
