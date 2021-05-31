/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const activeState = css`
  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`

const hoverColor = css`
  &:hover {
    color: #f4f6f6;
  }
`

const baseStyle = css`
  line-height: 1.1;
  padding: .4em .6em .4em .6em;
  border: 1px solid #fff;
  color: #000;
  appearance: none;
  background-color: #3498db;
  pointerEvents: 'all';
  font-size: 0.8em;
`;

// Expects a limitHook and resets it to a large range
// Keeps it visible when mouse is down to prevent slight movements
// during the click from making it disappear which will make the click fail.
const ResetButton = (props) => {
  /* console.log('ResetButton props: ',props) */
  return(
   <foreignObject 
     width={props.buttonwidth}  
     height={30}
     x={props.xoffset}
     y={props.yoffset}
   >
       <button 
         onClick={() => {
           props.setselection(true, 0, 0, 0, 0)
           props.limitHook.setRawLims('x',[0, 999999999999])
           props.limitHook.setRawLims('y',[0, 999999999999])
         } }
         css={[ baseStyle, activeState, hoverColor, 
         {visibility: ((props.selectx || props.ismousedown ) ? 'visibile' : 'hidden')}, 
         (props.cssStyles ? props.cssStyles : undefined)]}
       >
         reset limits
       </button>
   </foreignObject>
  )
}

export { ResetButton }
