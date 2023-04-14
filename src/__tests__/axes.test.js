import React from 'react';
import { format } from 'd3-format';
import { scaleSymlog, scaleLog, scalePow } from 'd3-scale';
import '@testing-library/jest-dom'
import { render, screen, renderHook, act } from '@testing-library/react'
import { customXscale, customYscale, linearYScale, scaleHistLin, AxisBottom, AxisLeft, Tick, TickSet, TickDumbSet, TickLine, Gtext, getTickLabels } from '../axes'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

describe('TickLine tests', () => {
    test('Render a y tickline', () => {
        let liney = {y2: 10} 
        const { container } = render(<svg> <TickLine {...liney} /> </svg>) 
        expect(container.getElementsByTagName('line').item(0).getAttribute("stroke")).toEqual('#000')
    });
    test('Render an x tickline', () => {
        let linex = {x2: 10} 
        const { container } = render(<svg> <TickLine {...linex} /> </svg>) 
        expect(container.getElementsByTagName('line').item(0).getAttribute("x2")).toEqual('10')
    });
})

describe('Gtext tests', () => {
    test('Render a y text label', () => {
        let ylabel = {
            style: {dominantBaseline: 'mathematical'},
            x: -6, 
            dx: '-0.4em'
        } 
        const { container } = render(<svg> <Gtext label='test' {...ylabel} /> </svg>) 
        expect(container.getElementsByTagName('text').item(0).getAttribute("dx")).toEqual('-0.4em')
        // expect(container.contains([<text fill="#000" style={{dominantBaseline: 'mathematical'}} x={-6} dx={"-0.4em"}></text>])).toBeTruthy()
    });

    test('Render an x text label', () => {
        let xlabel = {
            style: {textAnchor: 'middle'},
            y: 6, 
            dy: '0.9em',
        } 
        const { container } = render(<svg> <Gtext label='test' {...xlabel} /> </svg>) 
        expect(container.getElementsByTagName('text').item(0).getAttribute("y")).toEqual('6')
        // expect(container.contains(<text fill='#000' y={6} dy={'0.9em'} style={{textAnchor: "middle"}} />)).toBeTruthy()
    });

})

describe('Tick tests', () => {
    test('Render an x tick', () => {
        let offset = 1, label =  '1';
        let line = {y2: 10} 
        let text={ style: {textAnchor: 'middle'}, y: 6, dy: '0.9em' }
        const { container } = render(<svg> <Tick offset={offset} label={label} line={line} text={text} stroke='#000' /> </svg>) 
        expect(container.getElementsByTagName('line').item(0)).toBeTruthy()
        expect(container.getElementsByTagName('g').item(0).getAttribute("transform")).toEqual('translate(1,0)')
        expect(container.getElementsByTagName('text').item(0).innerHTML).toEqual("1")
    });

    test('Render a y tick', () => {
        let offset = 1, label =  '1';
        let line = {x2: -10} 
        let text={ style: {dominantBaseline: 'mathematical'}, x: -6, dx: '-0.5em' }
        const { container } = render(<svg> <Tick offset={offset} label={label} line={line} text={text} stroke='#000' /> </svg>) 
        expect(container.getElementsByTagName('line').item(0).getAttribute('x2')).toEqual('-10')
        expect(container.getElementsByTagName('g').item(0).getAttribute("transform")).toEqual('translate(0,1)')
        expect(container.getElementsByTagName('text').item(0).innerHTML).toEqual("1")

    });

})

describe('Tickset tests', () => {
    test('Render a Tickset akin to x axis ticks', () => {
        const ticks = [[10, '10'], [25, '25'], [50, '50']]
        const dy = '0.9em'
        const { container } = render(<svg> <TickSet ticks={ticks} line={{y2: 10}} text={{y:6, dy: dy}} /> </svg>)

        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('25')).toBeInTheDocument()
        expect(screen.getByText('25').getAttribute('dy')).toEqual('0.9em')
        expect(screen.getByText('50')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(10,0)')
        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(25,0)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(50,0)')
    });

    test('Render a Tickset akin to y axis ticks', () => {
        const ticks = [[10, '10'], [25, '25'], [50, '50']]
        const dx = '-0.4em'
        const { container } = render(<svg> <TickSet ticks={ticks} line={{x2: 10}} text={{x:-6, dx: dx}} /> </svg>) 

        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('25')).toBeInTheDocument()
        expect(screen.getByText('25').getAttribute('dx')).toEqual(dx)
        expect(screen.getByText('50')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(0,10)')
        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(0,25)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(0,50)')
    });

})

describe('TickDumbset tests', () => {

    test('Render a set of dumb ticks horizontally', () => {
        const ticks = ['10', '30', '50']
        const dy = '0.9em'
        const { container } = render(<svg> <TickDumbSet ticks={ticks} line={{y2: 10}} text={{y:6, dy: dy}} width={5} height={6}/> </svg>) 

        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
        expect(screen.getByText('30').getAttribute('dy')).toEqual(dy)
        expect(screen.getByText('50')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(5,0)')
        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(10,0)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(15,0)')
    });

    test('Render a set of dumb ticks vertically', () => {
        const ticks = ['10', '30', '50']
        const dx = '0.5em'
        const { container } = render(<svg> <TickDumbSet stackvert={true} ticks={ticks} line={{x2: 10}} text={{x:6, dx: dx}} width={5} height={6}/> </svg>) 

        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
        expect(screen.getByText('30').getAttribute('dx')).toEqual(dx)
        expect(screen.getByText('50')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(0,6)')
        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(0,12)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(0,18)')
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
        const { container } = render(<svg><AxisBottom 
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

        expect(screen.getByText('0')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('15')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(0,110)')
        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(0,0)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(36.7,0)')
        expect(container.getElementsByTagName('g').item(3).getAttribute('transform')).toEqual('translate(73.3,0)')
        expect(container.getElementsByTagName('g').item(4).getAttribute('transform')).toEqual('translate(110,0)')

        // A bottom axis sets the x scaling for the figure
        expect(mockLimitHook.setXscale).toHaveBeenCalledTimes(1)
        expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
        expect(mockscaleSet).toHaveBeenCalledTimes(1)
    });

    test('Render a Left side axis', () => {
        const { container } = render(<svg><AxisLeft 
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


        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(0,1)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(0,51)')
        expect(container.getElementsByTagName('g').item(3).getAttribute('transform')).toEqual('translate(0,101)')

        // The Y scale is set but not in the limitHook, because that has 
        // been for x data only thus far.
        expect(mockLimitHook.setYscale).toHaveBeenCalledTimes(0)
        expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
        expect(mockscaleSet).toHaveBeenCalledTimes(1)
    });


    test('Render a Left side axis with custom scale', () => {
        const { container } = render(<svg><AxisLeft 
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


        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('80')).toBeInTheDocument()
        expect(screen.getByText('60')).toBeInTheDocument()
        expect(screen.getByText('40')).toBeInTheDocument()
        expect(screen.getByText('20')).toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument()

        expect(container.getElementsByTagName('g').item(1).getAttribute('transform')).toEqual('translate(0,1)')
        expect(container.getElementsByTagName('g').item(2).getAttribute('transform')).toEqual('translate(0,7)')
        expect(container.getElementsByTagName('g').item(3).getAttribute('transform')).toEqual('translate(0,14.2)')
        expect(container.getElementsByTagName('g').item(4).getAttribute('transform')).toEqual('translate(0,23.5)')
        expect(container.getElementsByTagName('g').item(5).getAttribute('transform')).toEqual('translate(0,37.4)')
        expect(container.getElementsByTagName('g').item(6).getAttribute('transform')).toEqual('translate(0,111)')

        // expect(container.containsAllMatchingElements([
        //     <line x2={-6} />,
        // ])).toBeTruthy() 
        // expect(container.text()).toEqual('100806040200')
        // expect(container.find('g').get(1).props.transform).toEqual('translate(0,1)')
        // expect(container.find('g').get(2).props.transform).toEqual('translate(0,7)')
        // expect(container.find('g').get(3).props.transform).toEqual('translate(0,14.2)')
        // expect(container.find('g').get(4).props.transform).toEqual('translate(0,23.5)')
        // expect(container.find('g').get(5).props.transform).toEqual('translate(0,37.4)')
        // expect(container.find('g').get(6).props.transform).toEqual('translate(0,111)')
        // expect(container.find('line[x2=-6]').length).toEqual(6)

        // The Y scale is set but not in the limitHook, because that has 
        // been for x data only thus far.
        expect(mockLimitHook.setYscale).toHaveBeenCalledTimes(0)
        expect(mockLimitHook.setRawLims).toHaveBeenCalledTimes(1)
        expect(mockscaleSet).toHaveBeenCalledTimes(1)
    });


})

