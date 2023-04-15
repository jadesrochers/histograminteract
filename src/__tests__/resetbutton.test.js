import React from 'react';
import { render, screen, renderHook, act, fireEvent } from '@testing-library/react'
import { ResetButton } from '../resetbutton'

describe('ResetButton tests', () => {
  test('Render a y tickline', () => {
    const limitHook={setRawLims: jest.fn()}
    const setselection=jest.fn()
    
    // Hook is a mock, so no need to use a hook wrapper
    const { container } = render(<svg>
        <ResetButton 
        limitHook={limitHook}
        setselection={setselection}
        xoffset={5}
        yoffset={0}
        width={20}
      /> </svg>) 
    // expect(wrapper.containsAllMatchingElements([<button > reset limits </button>])).toBeTruthy()

    const button = container.getElementsByTagName('button').item(0)
    fireEvent.click(button)
    expect(setselection).toHaveBeenCalledWith(true, 0, 0, 0, 0)
    expect(limitHook.setRawLims).toHaveBeenCalledWith('x', [0, 999999999999])
    expect(limitHook.setRawLims).toHaveBeenCalledWith('y', [0, 999999999999])

  });

})


