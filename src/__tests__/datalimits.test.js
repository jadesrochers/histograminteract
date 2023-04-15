import React from 'react';
import { useLimits } from '../datalimits'
import { renderHook, act } from '@testing-library/react'

describe('useLimits tests', () => {
    test('Test raw and scaled limit setting', () => {

        // the wrapping function for the hook is so that args can be 
        // passed to initialize if needed. Did not need to here.
        const xscale = { invert: (n) => n*2 }
        const yscale = { invert: (n) => n/2 }
        const { result } = renderHook(() => useLimits()) 

        expect(result.current.xlimits).toEqual({min:0, max:0})
        expect(result.current.ylimits).toEqual({min:0, max:0})

        act(() => {
            result.current.setRawLims('x',[15, 45])
            result.current.setRawLims('y',[5, 30])
        })
        expect(result.current.xlimits).toEqual({min:15, max:45})
        expect(result.current.ylimits).toEqual({min:5, max:30})

        act(() => {
            result.current.setXscale(() => xscale)
            result.current.setYscale(() => yscale)
        })

        act(() => {
            result.current.setLimits('x', [10, 30])
            result.current.setLimits('y', [50, 200])
        })

        expect(result.current.xlimits).toEqual({min:20, max:60})
        expect(result.current.ylimits).toEqual({min:25, max:100})

    });
})
