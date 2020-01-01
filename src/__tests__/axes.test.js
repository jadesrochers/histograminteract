import React from 'react';
import { format } from 'd3-format';
import { scaleSymlog, scaleLog, scalePow } from 'd3-scale';
import { shallow, mount } from '../enzyme';
import { customXscale, customYscale, linearYScale, scaleHistLin, AxisBottom, AxisLeft, Tick, TickSet, TickDumbSet, TickLine, Gtext, getTickLabels } from '../axes'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

describe('TickLine tests', () => {
  test('Render a y tickline', () => {
    let liney = {y2: 10} 
    let wrapper = mount(<svg> <TickLine {...liney} /> </svg>) 
    /* console.log(wrapper.debug()) */
    expect(wrapper.containsMatchingElement(<line stroke="#000" y2={10}></line>)).toBeTruthy()
  });
  test('Render an x tickline', () => {
    let linex = {x2: 10} 
    let wrapper = mount(<svg> <TickLine {...linex} /> </svg>) 
    expect(wrapper.containsMatchingElement(<line stroke='#000' x2={10} />)).toBeTruthy()
  });
})

describe('Gtext tests', () => {
  test('Render a y text label', () => {
    let ylabel = {
          style: {dominantBaseline: 'mathematical'},
          x: -6, 
          dx: '-0.4em'
        } 
    let wrapper = mount(<svg> <Gtext {...ylabel} /> </svg>) 
    /* console.log('Y text label :', wrapper.html()) */
    expect(wrapper.contains([<text fill="#000" style={{dominantBaseline: 'mathematical'}} x={-6} dx={"-0.4em"}></text>])).toBeTruthy()
  });

  test('Render an x text label', () => {
    let xlabel = {
          style: {textAnchor: 'middle'},
          y: 6, 
          dy: '0.9em'
        } 
    let wrapper = mount(<svg> <Gtext {...xlabel} /> </svg>) 
    /* console.log('X text label :', wrapper.html()) */
    expect(wrapper.contains(<text fill='#000' y={6} dy={'0.9em'} style={{textAnchor: "middle"}} />)).toBeTruthy()
  });

})

describe('Tick tests', () => {
  test('Render an x tick', () => {
    let offset = 1, label =  '1';
    let line = {y2: 10} 
    let text={ style: {textAnchor: 'middle'}, y: 6, dy: '0.9em' }
    let wrapper = mount(<svg> <Tick offset={offset} label={label} line={line} text={text} stroke='#000' /> </svg>) 
    /* console.log('Tick render :', wrapper.debug()) */
    expect(wrapper.containsAllMatchingElements([<line stroke="#000" y2={10}></line>, <text style={{textAnchor: 'middle' }} y={6} dy='0.9em' > 1 </text>])).toBeTruthy()
   expect(wrapper.find('g').get(0).props.transform).toEqual("translate(1,0)")
  });

  test('Render a y tick', () => {
    let offset = 1, label =  '1';
    let line = {x2: -10} 
    let text={ style: {dominantBaseline: 'mathematical'}, x: -6, dx: '-0.5em' }
    let wrapper = mount(<svg> <Tick offset={offset} label={label} line={line} text={text} stroke='#000' /> </svg>) 
    /* console.log('Tick render :', wrapper.debug()) */
    expect(wrapper.containsAllMatchingElements([<line stroke="#000" x2={-10}></line>, <text style={{dominantBaseline: 'mathematical'}} x={-6} dx='-0.5em' > 1 </text>])).toBeTruthy()
   expect(wrapper.find('g').get(0).props.transform).toEqual("translate(0,1)")
  });

})

describe('Tickset tests', () => {
  test('Render a Tickset akin to x axis ticks', () => {
    let ticks = [[10, '10'], [25, '25'], [50, '50']]
    let wrapper = mount(<svg> <TickSet ticks={ticks} line={{y2: 10}} text={{y:6, dy: '0.9em'}} /> </svg>)
    
    /* console.log('X axis rendered: ',wrapper.debug()) */
    expect(wrapper.hostNodes().containsAllMatchingElements([
     <line y2={10}/>,
     <text y={6} dy="0.9em"> 10 </text>,
     <text y={6} dy="0.9em"> 25 </text>,
     <text y={6} dy="0.9em"> 50 </text>,
     ])).toBeTruthy()
    expect(wrapper.find('g').get(0).props.transform).toEqual('translate(10,0)')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(25,0)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(50,0)')
  });

  test('Render a Tickset akin to y axis ticks', () => {
    let ticks = [[10, '10'], [25, '25'], [50, '50']]
    let wrapper = mount(<svg> <TickSet ticks={ticks} line={{x2: 10}} text={{x:-6, dx: '-0.4em'}} /> </svg>) 

    /* console.log('Y axis rendered: ',wrapper.debug()) */
    expect(wrapper.hostNodes().containsAllMatchingElements([
     <line x2={10}/>,
     <text x={-6} dx="-0.4em"> 10 </text>,
     <text x={-6} dx="-0.4em"> 25 </text>,
     <text x={-6} dx="-0.4em"> 50 </text>,
     ])).toBeTruthy()
    expect(wrapper.find('g').get(0).props.transform).toEqual('translate(0,10)')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(0,25)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(0,50)')
  });

})

describe('TickDumbset tests', () => {

  test('Render a set of dumb ticks horizontally', () => {
    let ticks = ['10', '30', '50']
    let wrapper = mount(<svg> <TickDumbSet ticks={ticks} line={{y2: 10}} text={{y:6, dy: '0.9em'}} width={5} height={6}/> </svg>) 
    /* console.log( 'Horizontal Dumbset ticks :', wrapper.debug() ) */

    expect(wrapper.containsAllMatchingElements([ 
       <line y2={10}/>,
       <text y={6} dy="0.9em"> 10 </text>,
       <text y={6} dy="0.9em"> 30 </text>,
       <text y={6} dy="0.9em"> 50 </text>,
     ])).toBeTruthy()
    expect(wrapper.find('g').get(0).props.transform).toEqual('translate(5,0)')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(10,0)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(15,0)')
  });

  test('Render a set of dumb ticks vertically', () => {
    let ticks = ['10', '30', '50']
    let wrapper = mount(<svg> <TickDumbSet stackvert={true} ticks={ticks} line={{x2: 10}} text={{x:6, dx: '0.5em'}} width={5} height={6}/> </svg>) 
    /* console.log( 'Vertical Dumbset ticks :', wrapper.debug() ) */

    expect(wrapper.containsAllMatchingElements([
      <line x2={10}/>,
      <text x={6} dx="0.5em"> 10 </text>,
      <text x={6} dx="0.5em"> 30 </text>,
      <text x={6} dx="0.5em"> 50 </text>,
     ])).toBeTruthy()
    expect(wrapper.find('g').get(0).props.transform).toEqual('translate(0,6)')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(0,12)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(0,18)')
  });

})

describe('Scaling tests', () => {

  const lyScale = linearYScale({ydata:[1,1,1,3,4,6,7,11], height:110}) 
  const histScale = scaleHistLin({xdata:[1,1,1,3,4,6,7,10], width:110, nbins:10}) 

  // The scale must be returned by a function, so if it is not, just
  // wrap it in one like I do with the Pow scale here. 
  const ycust = customYscale(() => scalePow().exponent(1/4), 0, undefined, {ydata:[1,1,1,3,4,6,7,30,100], height:110}) 
  const xcust = customXscale(() => scalePow().exponent(1/2), 0, undefined, {xdata:[1,1,1,3,4,6,7,30,100], width:110, nbins:10}) 

  // For log scales use scaleSymlog, otherwise there are problems
  // because plain log can't handle zero
  const xcustsymlog = customXscale(scaleSymlog, 0, undefined, {xdata:[1,1,1,3,4,6,7,30,100,500,1234], width:110, nbins:10}) 
  const xcustlog = customXscale(scaleLog, 1, undefined, {xdata:[1,1,1,3,4,6,7,30,100,500,1234], width:110, nbins:10}) 

  const ycustlog = customYscale(scaleLog, 1, undefined, {ydata:[1,1,1,3,4,6,7,30,100,500,1234], height:110 }) 

  test('Use a linearYScale', () => {
    expect(lyScale(11)).toEqual(110)
    expect(lyScale(0)).toEqual(0)
    expect(lyScale(5.5)).toEqual(55)
  });

  test('Use a Histogram scale', () => {
    expect(histScale(0)).toEqual(0)
    expect(histScale(10)).toEqual(100)
    expect(histScale(5.5)).toEqual(55)
  });

  test('Use a custom Y scale', () => {
    expect(Math.round(ycust(1))).toEqual(35)
    expect(Math.round(ycust(80))).toEqual(104)
    expect(Math.round(ycust(10))).toEqual(62)
  });

  test('Use a custom X scale', () => {
    expect(xcust(0)).toEqual(0)
    expect(Math.round(xcust(81))).toEqual(94)
    expect(Math.round(xcust(10))).toEqual(33)
  });

  test('Use a custom log X scale', () => {
    expect(xcustlog(1)).toEqual(0)
    expect(Math.round(xcustlog(10))).toEqual(35)
    expect(Math.round(xcustlog(100))).toEqual(70)
    expect(Math.round(xcustlog(1000))).toEqual(105)
  });

  test('Use a custom log Y scale', () => {
    expect(ycustlog(1)).toEqual(0)
    expect(Math.round(ycustlog(10))).toEqual(36)
    expect(Math.round(ycustlog(100))).toEqual(71)
    expect(Math.round(ycustlog(1000))).toEqual(107)
  });

  test('Use a custom log X scale', () => {
    expect(xcustsymlog(0)).toEqual(0)
    expect(Math.round(xcustsymlog(1))).toEqual(11)
    expect(Math.round(xcustsymlog(10))).toEqual(37)
    expect(Math.round(xcustsymlog(100))).toEqual(70)
    expect(Math.round(xcustsymlog(1000))).toEqual(105)
  });


  test('Get labels for ticks', () => {
    let ticks = getTickLabels(histScale, 6) 
    expect(ticks.formatted).toEqual(['0','2','4','6','8','10','12'])
    expect(ticks.scaled).toEqual([0,18.3,36.7,55,73.3,91.7,110])
  });

  test('Get labels for custom y scaling ticks', () => {
    let ticks = getTickLabels(ycust, 6) 
    expect(ticks.formatted).toEqual(['0','20','40','60','80','100'])
    expect(ticks.scaled).toEqual([0,73.6,87.5,96.8,104,110])
  });

  test('Get labels for custom y scaling ticks', () => {
    let ticks = getTickLabels(ycustlog, 4) 
    expect(ticks.formatted).toEqual(['1','10','100','1000','10000'])
    expect(ticks.scaled).toEqual([0,27.5,55,82.5,110])
  });

})

describe('Axes tests', () => {
  let mockLimitHook, mockscaleSet
  let numticks = 3 
  beforeEach(() => {
    mockLimitHook = {setXscale: jest.fn(), setYscale: jest.fn(), setRawLims: jest.fn()}
    mockscaleSet = jest.fn()
  })

  test('Render a Bottom axis', () => {
    let wrapper = mount(<svg><AxisBottom 
      limitHook={mockLimitHook}
      xscaleSet={mockscaleSet}
      xticks={numticks} 
      scale={scaleHistLin} 
      xdata={[1,1,1,3,4,6,7,10]} 
      height={110} 
      width={110} 
      nbins={10} 
      tickformat={format('.2~f')} 
      /></svg>) 

    /* console.log( 'Bottom axis: ', wrapper.debug() ) */

    expect(wrapper.containsAllMatchingElements([
      <line y2={6} />,
     ])).toBeTruthy() 
    expect(wrapper.text()).toEqual('051015')
    expect(wrapper.find('g').get(0).props.transform).toEqual('translate(0,110)')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(0,0)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(36.7,0)')
    expect(wrapper.find('g').get(3).props.transform).toEqual('translate(73.3,0)')
    expect(wrapper.find('g').get(4).props.transform).toEqual('translate(110,0)')

    // A bottom axis sets the x scaling for the figure
    expect(mockLimitHook.setXscale).toHaveBeenCalledTimes(1)
    expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
    expect(mockscaleSet).toHaveBeenCalledTimes(1)
  });

  test('Render a Left side axis', () => {
    let wrapper = mount(<svg><AxisLeft 
      limitHook={mockLimitHook}
      yscaleSet={mockscaleSet}
      yticks={numticks} 
      scale={linearYScale}
      ydata={[1,1,1,3,4,6,7,10]} 
      height={100} 
      width={100} 
      nbins={10} 
      tickformat={format('.2~f')} 
      /></svg>) 


    /* console.log( 'Left side axis: ', wrapper.debug() ) */
    expect(wrapper.containsAllMatchingElements([
      <line x2={-6} />,
     ])).toBeTruthy() 
    expect(wrapper.text()).toEqual('1050')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(0,0)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(0,50)')
    expect(wrapper.find('g').get(3).props.transform).toEqual('translate(0,100)')
    expect(wrapper.find('line[x2=-6]').length).toEqual(3)
    
    // The Y scale is set but not in the limitHook, because that has 
    // been for x data only thus far.
    expect(mockLimitHook.setYscale).toHaveBeenCalledTimes(0)
    expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
    expect(mockscaleSet).toHaveBeenCalledTimes(1)
  });


  test('Render a Left side axis with custom scale', () => {
    let wrapper = mount(<svg><AxisLeft 
      limitHook={mockLimitHook}
      yscaleSet={mockscaleSet}
      yticks={4} 
      scale={customYscale(() => scalePow().exponent(1/4), 0, undefined)} 
      ydata={[1,1,1,3,4,6,7,30,100]} 
      height={110} 
      width={110} 
      nbins={10} 
      tickformat={format('.2~f')} 
      /></svg>) 

    expect(wrapper.containsAllMatchingElements([
      <line x2={-6} />,
     ])).toBeTruthy() 
    expect(wrapper.text()).toEqual('100806040200')
    expect(wrapper.find('g').get(1).props.transform).toEqual('translate(0,0)')
    expect(wrapper.find('g').get(2).props.transform).toEqual('translate(0,6)')
    expect(wrapper.find('g').get(3).props.transform).toEqual('translate(0,13.2)')
    expect(wrapper.find('g').get(4).props.transform).toEqual('translate(0,22.5)')
    expect(wrapper.find('g').get(5).props.transform).toEqual('translate(0,36.4)')
    expect(wrapper.find('g').get(6).props.transform).toEqual('translate(0,110)')
    expect(wrapper.find('line[x2=-6]').length).toEqual(6)
    
    // The Y scale is set but not in the limitHook, because that has 
    // been for x data only thus far.
    expect(mockLimitHook.setYscale).toHaveBeenCalledTimes(0)
    expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
    expect(mockscaleSet).toHaveBeenCalledTimes(1)
  });


})

