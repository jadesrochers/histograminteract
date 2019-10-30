import React from 'react';
import { shallow } from '../enzyme';
import { useLimits } from '../datalimits'
import { HookWrapper } from '@jadesrochers/reacthelpers'

describe('useLimits tests', () => {
  test('Test raw and scaled limit setting', () => {

    // the wrapping function for the hook is so that args can be 
    // passed to initialize if needed. Did not need to here.
    let xscale = { invert: (n) => n*2 }
    let yscale = { invert: (n) => n/2 }
    let wrapper = shallow(<HookWrapper hook={() => useLimits()}  />) 
    let hook = wrapper.find('div').props().hook;

    expect(hook.xlimits).toEqual({min:0, max:0})
    expect(hook.ylimits).toEqual({min:0, max:0})

    hook.setRawLims('x',[15, 45])
    hook.setRawLims('y',[5, 30])

    hook = wrapper.find('div').props().hook
    expect(hook.xlimits).toEqual({min:15, max:45})
    expect(hook.ylimits).toEqual({min:5, max:30})

    hook.setXscale(() => xscale)
    hook.setYscale(() => yscale)

    hook = wrapper.find('div').props().hook
    hook.setLimits('x', [10, 30])
    hook.setLimits('y', [50, 200])

    hook = wrapper.find('div').props().hook
    expect(hook.xlimits).toEqual({min:20, max:60})
    expect(hook.ylimits).toEqual({min:25, max:100})

  });
})
