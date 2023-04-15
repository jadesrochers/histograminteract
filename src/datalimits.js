import { useState } from 'react';
import * as R from 'ramda';


// The limit object is designed to be passed to a Component that 
// is selecting data and one that is displaying it to configure 
// the data that shows up.
const useLimits = () => {
  const [xlimits, setxlimits] = useState({min:0, max:0})
  const [ylimits, setylimits] = useState({min:0, max:0})
  // The scale functions come from d3-scale; scale.invert()
  // gets the original values, which are used to check data against limits.
  const [xscale, setXscale] = useState(() => { const invert = n => n; return {invert: invert} })
  const [yscale, setYscale] = useState(() => { const invert = n => n; return {invert: invert} })

  const setLimits = R.curry((which, maxmin) => {
    const vals = R.values(maxmin)
    let scale, setlims
    if(R.equals(which)('x')){
      scale = xscale; setlims = setxlimits
    }else{
      scale = yscale; setlims = setylimits
    }
    const scaled = R.map(scale.invert)(vals)
    setlims({min: R.min(...scaled), max: R.max(...scaled)})
  })

  const setRawLims = (which, maxmin) => {
    const min = R.min(...maxmin), max = R.max(...maxmin)
    if(R.equals(which)('x')){
      setxlimits({min: min, max: max})
    }else{
      setylimits({min: min, max: max})
    }
  }

  return { setLimits, setRawLims, setXscale, setYscale, xlimits, ylimits }
}

export { useLimits }
