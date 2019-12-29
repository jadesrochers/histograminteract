import React from 'react';
import { mount } from '../enzyme';
import { HistogramDataHighlight } from '../histograms'
import { customYscale, customXscale } from '../axes'
import { scaleSymlog, scaleLog} from 'd3-scale';
import { format } from 'd3-format';

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

  // If you want to use a custom scale need to pass it through the 
  // customX/Y scale functions from axes module to get it set up.
  test('test custom scaling,format for HistogramDataHighlight', () => {
    let custLog = customXscale(scaleLog, 1, undefined)
    let wrapper = mount(
      <svg> 
        <HistogramDataHighlight 
          xdata={[1,2,4,6,9,22,40,93,125,237,540,1121,2431,5434,10321]}  
          xscale={custLog}
          nbins={5}
          xticks={5}
          yticks={3}
          height={140}
          width={270}
          xformatter={format('.2s')}
          yformatter={format('.3s')}
          margins={{top: 10, left: 50, bottom: 30, right: 20}}
        />
      </svg>) 

    // The axes are tested extensively elsewhere, just checking
    // the bars here.
    /* console.log('Histogram scale test: ', wrapper.debug()) */
    expect(wrapper.containsAllMatchingElements(
      [
        <rect height={100} width={39} />, 
        <rect height={75} width={39} />, 
        <rect height={75} width={39} />,
        <rect height={75} width={39} />, 
        <rect height={25} width={39} />, 
      ]
      )).toBeTruthy()

      expect(wrapper.text()).toEqual('4.003.002.001.000.001.0101001.0k10k100kreset limits')
  });



})


