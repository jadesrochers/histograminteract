/** @jsx jsx */
import { useMemo } from 'react';
import * as R from 'ramda';
import { jsx } from '@emotion/core'
import { format } from 'd3-format';
import { scaleLinear } from 'd3-scale';

const getTickLabels = R.curry((scale, nticks, formatter=format('.2~f')) => {
  let ticks = scale.nice(nticks).ticks(nticks)
  let scaled = R.map(n => Math.round(n*10)/10)(R.map(scale)(ticks))
  let formatted = R.map(formatter)(ticks)  
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

const TickLine = ({stroke, length, ...other}) => {
  stroke = stroke ? stroke : '#000' 
  return(
    <line stroke={stroke} {...other}  css={{ shapeRendering: "crispEdges"}}  />
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
  let trans
  trans = `translate(0,${offset})`
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
  let stackvert = other.stackvert ? other.stackvert : false 
  let offset = 0;
  let format = other.format ? other.format : ((n) => n)
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
  let xscale = props.scale(props)
  let { scaled, formatted } = getTickLabels(xscale, props.xticks, props.tickformat)
  let ticks = R.zip(scaled, formatted)
  let defaultStyle = {stroke: '#000000'}
  let data0 = props.xdata[0]
  useMemo(() => {
    props.limitHook && props.limitHook.setXscale(() => xscale)
    props.xscaleSet(() => xscale)
    props.limitHook && props.limitHook.setRawLims('x',[Math.max(...props.xdata),Math.min(...props.xdata)])
  }, [props.xdata.length, data0])  
 
  return (
    <g transform={`translate(0,${props.height})`} style={{fontSize: '0.8rem'}} >
      <line x1={-1} y1={1} x2={props.width} y2={1} style={props.styles ? props.styles : defaultStyle} css={{ shapeRendering: "crispEdges"}} />
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
  let yscale = props.scale(props)
  let { scaled, formatted } = getTickLabels(yscale, props.yticks)
  let ticks =  R.zip(scaled, R.reverse(formatted))
  let defaultStyle = {stroke: '#000000'}
  useMemo(() => {
    props.yscaleSet(() => yscale)
    props.ydata && props.limitHook.setRawLims('y',[Math.max(...props.ydata),Math.min(...props.ydata)])
  }, [props.ydata, props.ymax])  
 
  return (
    <g textAnchor='end' style={{fontSize: '0.8rem'}} >
      <line x1={0} y1={props.height} x2={0} y2={0} style={props.styles ? props.styles : defaultStyle} css={{ shapeRendering: "crispEdges"}}/>
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

export { linearYScale, scaleHistLin, AxisBottom, AxisLeft, Tick, TickSet, TickDumbSet, TickLine, Gtext, getTickLabels }
