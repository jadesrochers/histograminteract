import React from "react";
import styles from "./resetbutton.module.css";

// Expects a limitHook and resets it to a large range
// Keeps it visible when mouse is down to prevent slight movements
// during the click from making it disappear which will make the click fail.
const ResetButton = (props) => {
  // console.log('ResetButton props: ',props) 
  const show = (props.selectx || props.ismousedown) ? "visible" : "hidden";
  const visibility = {
      visibility: ((props.selectx || props.ismousedown) ? "visible" : "hidden"),
  }
  const baseClasses = `${styles.activeState} ${styles.baseStyle}`
  const coloration = `${styles.hoverColor} ${styles.defaultStyle}`
  const classnames = props.classnames ? `${props.classnames.join(' ')} ${baseClasses}` : `${baseClasses} ${coloration}`
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
         style={visibility}
         className={classnames}
       >
         reset limits
       </button>
   </foreignObject>
  )
}

export { ResetButton }
