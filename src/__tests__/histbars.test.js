import React from 'react';
import { shallow } from '../enzyme';
import { HighlightBars, RegBars } from '../histbars'

describe('Histbar tests', () => {
  // The tests are very basic because it would be complex to mount them
  // with all the args/interactions they need to work completely.
  // Histogram.test integration test covers them better.
  test('test for HighlightBars', () => {
    let ymaxSet = jest.fn()
    let setPlotData = jest.fn()
    let wrapper = shallow(
      <svg> 
        <HighlightBars 
          xdata={[1,2,3,3,4,4,6,8,11]}  
          nbins={5}
          ymaxSet={ymaxSet}
          setPlotData={setPlotData}
        />
      </svg>) 
    /* console.log(wrapper.debug()) */
    expect(wrapper.containsMatchingElement(<HighlightBars ></HighlightBars>)).toBeTruthy()
  });

  test('test for RegBars', () => {
    let wrapper = shallow(
      <svg> 
        <RegBars 
          xdata={[1,2,3,3,4,4,6,8,11]}  
          nbins={5}
        />
      </svg>) 
    expect(wrapper.containsMatchingElement(<RegBars ></RegBars>)).toBeTruthy()
  });
})


