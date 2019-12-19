import React from 'react';
import { mount } from '../enzyme';
import { ResetButton } from '../resetbutton'

describe('ResetButton tests', () => {
  test('Render a y tickline', () => {
    let limitHook={setRawLims: jest.fn()}
    let setselection=jest.fn()
    
    // Hook is a mock, so no need to use a hook wrapper
    let wrapper = mount(<svg>
        <ResetButton 
        limitHook={limitHook}
        setselection={setselection}
        xoffset={5}
        yoffset={0}
        width={20}
      /> </svg>) 
    expect(wrapper.containsAllMatchingElements([<button > reset limits </button>])).toBeTruthy()

    let onclick = wrapper.find('button').props().onClick
    onclick()
    expect(setselection).toHaveBeenCalledWith(true, 0, 0, 0, 0)
    expect(limitHook.setRawLims).toHaveBeenCalledWith('x', [0, 999999999999])
    expect(limitHook.setRawLims).toHaveBeenCalledWith('y', [0, 999999999999])

  });

})


