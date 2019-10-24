import React from 'react';
import { mount } from '../enzyme';
import { FigureContainer } from '../figurebuilder'

const TestElem = (props) => {
  return(
    <div />
  )
}

describe('FigureContainer tests', () => {
  test('Create FigureContainer, check all props have been passed', () => {
    let formatter = jest.fn()
    let wrapper = mount(<svg> <FigureContainer
        height={150} width={700}
        margins={{top: 10, left: 50, bottom: 30, right: 20}}
        xdata={[1,2,3,4,5]} 
        nbins={25}
        xticks={10} yticks={6}
        tickformat={ formatter }
      >
       <TestElem key="test" />
     </FigureContainer> </svg>
     ) 

    /* console.log(wrapper.debug()) */
    expect(wrapper.find('g').props().transform).toEqual('translate(50,10)')
    // Test to make sure all arguments are available to 
    // the child element, since figurebuilder is just providing them
    expect(wrapper.containsMatchingElement([
      <TestElem 
        height={110} width={630}
        xdata={[1,2,3,4,5]} nbins={25}
        xticks={10} yticks={6}
        ymax={10} ymaxSet
        xscale  yscale
        xscaleSet yscaleSet
        plotData setPlotData
        tickformat
      > 
      <div />
      </TestElem>
    ])).toBeTruthy()
  });

})


