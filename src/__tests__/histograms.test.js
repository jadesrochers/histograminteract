import React from 'react';
import { mount } from '../enzyme';
import { HistogramDataHighlight } from '../histograms'

describe('Histogram tests', () => {
  // Tests the histbars.js file, which was not readily done without
  // HistogramDataHighlight.
  test('Integration test for HistogramDataHighlight', () => {
    let wrapper = mount(
      <svg> 
        <HistogramDataHighlight 
          xdata={[1,2,3,3,4,4,6,11]}  
          nbins={5}
          xticks={5}
          yticks={3}
          height={140}
          width={270}
          margins={{top: 10, left: 50, bottom: 30, right: 20}}
        />
      </svg>) 

    // The axes are tested extensively elsewhere, just checking
    // the bars here.
    /* console.log('Histogram test: ', wrapper.debug()) */
    expect(wrapper.containsAllMatchingElements(
      [
        <rect height={100} width={27.6} />, 
        <rect height={50} width={27.6} />, 
        <rect height={25} width={27.6} />,
        <rect height={0} width={27.6} />, 
      ]
      )).toBeTruthy()
  });

})


