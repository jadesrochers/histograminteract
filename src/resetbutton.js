/** @jsx jsx */
import { jsx, css } from '@emotion/core'

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

// The Reset FAIL issue:
// This is where the button and selection disappears, but no reset is done.
// I think I finally figured out why it happens; there are two cases
// 1. There is a click, drag that leaves the reset button.
//    In this case the button gets highlighted, but the action does 
//    not fire because the drag takes the click out of the button
// 2. There is a click with slight movement. If the movement is enough
//    to select any space it works, but if it is very slight, then the 
//    button and box disappear, and the reset action does not fire.
//    NOTE: if you mousedown, slightly shift, the button is gone. But, if
//    you keep shifting it re-appears and works again, so this is some
//    edge case with a tiny bit of movement, but not a drag that selects
//    any area because that seems to re-ectivate it.
// FURTHER NOTE: I can mostly confirm that any selection in the x direction
// (> 0) makes it so this works even if you drag, but that if selectx is 0,
// it doesn't, so slight y movement is what causes this.
// y direction drags are what breaks this.
// THE FIX: Figure out how to make it appear when there is an x selection, 
// but not disappear unless it gets clicked.

// Expects a limitHook and resets it to a large range
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
