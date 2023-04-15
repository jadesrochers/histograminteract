import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react'
import { HistogramDataHighlight } from '../histograms'
import { customYscale, customXscale } from '../axes'
import { scaleSymlog, scaleLog} from 'd3-scale';
import '@testing-library/jest-dom'
import { format } from 'd3-format';

describe('Histogram tests', () => {
    // Tests the histbars.js file, which was not readily done without
    // HistogramDataHighlight.
    test('Integration test for HistogramDataHighlight', () => {
        const { container } = render(
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

        const rects = container.getElementsByTagName('rect')
        expect(rects.item(0).getAttribute('height')).toEqual('50')
        expect(rects.item(0).getAttribute('width')).toEqual('27.6')
        expect(rects.item(1).getAttribute('height')).toEqual('100')
        expect(rects.item(2).getAttribute('height')).toEqual('25')
        expect(rects.item(3).getAttribute('height')).toEqual('0')
        expect(rects.item(4).getAttribute('height')).toEqual('0')

    });

    // If you want to use a custom scale need to pass it through the 
    // customX/Y scale functions from axes module to get it set up.
    test('test custom scaling,format for HistogramDataHighlight', () => {
        const custLog = customXscale(scaleLog, 1, undefined)
        const { container } = render(
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

        const rects = container.getElementsByTagName('rect')
        expect(rects.item(0).getAttribute('height')).toEqual('100')
        expect(rects.item(0).getAttribute('width')).toEqual('39')
        expect(rects.item(1).getAttribute('height')).toEqual('75')
        expect(rects.item(2).getAttribute('height')).toEqual('75')
        expect(rects.item(3).getAttribute('height')).toEqual('75')
        expect(rects.item(4).getAttribute('height')).toEqual('25')


        // Y Labels
        expect(screen.getByText('0.00')).toBeInTheDocument()
        expect(screen.getByText('1.00')).toBeInTheDocument()
        expect(screen.getByText('2.00')).toBeInTheDocument()
        expect(screen.getByText('3.00')).toBeInTheDocument()
        expect(screen.getByText('4.00')).toBeInTheDocument()

        // X Labels
        expect(screen.getByText('1.0')).toBeInTheDocument()
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('1.0k')).toBeInTheDocument()
        expect(screen.getByText('10k')).toBeInTheDocument()
        expect(screen.getByText('100k')).toBeInTheDocument()
        expect(screen.getByText('reset limits')).toBeInTheDocument()
    });



})


