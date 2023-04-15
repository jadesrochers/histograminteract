import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HistogramDataHighlight } from '../histograms'


describe('Histogram tests', () => {
    // Tests the histbars.js file, which can only be done well with an 
    // Integration test 
    test('test the bars using a historgram', () => {
    const { container } = render(
        <svg> 
        <HistogramDataHighlight 
        xdata={[1,2,3,3,4,4,5,6,8,9,10]}  
        nbins={5}
        xticks={5}
        yticks={3}
        height={220}
        width={270}
        margins={{top: 10, left: 10, bottom: 10, right: 10}}
        />
        </svg>) 

    // The axes are tested extensively elsewhere, checking the bars here.
    const rects = container.getElementsByTagName('rect')
    expect(rects.item(0).getAttribute('height')).toEqual('90')
    expect(rects.item(0).getAttribute('width')).toEqual('32.3')
    expect(rects.item(1).getAttribute('height')).toEqual('180')
    expect(rects.item(2).getAttribute('height')).toEqual('90')
    expect(rects.item(3).getAttribute('height')).toEqual('45')
    expect(rects.item(4).getAttribute('height')).toEqual('90')
    });
})


