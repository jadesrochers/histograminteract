/** @jsx jsx */
import * as R from 'ramda';
import { jsx } from '@emotion/core'

const Rect = (props) => {
  let scale = props.scale ? `scale(${props.scale})` : ''
  return(
    <rect
     css={[{
        transform: `translate(${props.xoffset}px,${props.yoffset}px) ${scale}`,
        fill: props.fill
      },
      props.cssStyles ? props.cssStyles : undefined] }
      height={props.height ? props.height : 0}
      width={props.width}
    />
  )
}

const HighlightRect = (props) => {
  let fill = props.fill ? props.fill : '#48c9b0'
  if(props.isHighlighted(([props.xoffset, (props.xoffset + props.width)]), props.offx, (props.offx + props.selectx) )){
    fill = props.highlightfill ? props.highlightfill : '#3498db'
  }
  return(
    <Rect
     {...props}
     fill={fill}
    />
  )
}

const BarRects = (props) => {
  let stackvert = props.stackvert ? props.stackvert : false 
  let offset = 0;
  return(
   <g>
      {R.map((fill) => {
      offset=Math.round((stackvert ? (offset+props.height) : (offset+props.width))*10)/10
      return (
      <Rect key={offset}
        width={props.width}
        height={props.height} 
        xoffset={(stackvert ? 0 : offset)} 
        yoffset={(stackvert ? offset : 0)}
        fill={fill}
      />
      )
      })(props.fill)}
    </g>
  )
}

export { Rect, HighlightRect, BarRects }

