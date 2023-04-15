import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react'
import { FigureContainer } from '../figurebuilder'

const TestElem = (props) => {
    return(
        <div />
    )
}

describe('FigureContainer tests', () => {
    test('Create FigureContainer, check all props have been passed', () => {
        const formatter = jest.fn()
        const { container } = render(
            <svg> 
            <FigureContainer
            height={150} width={700}
            margins={{top: 10, left: 50, bottom: 30, right: 20}}
            xdata={[1,2,3,4,5]} 
            nbins={25}
            xticks={10} yticks={6}
            tickformat={ formatter }
            >
            <TestElem key="test" />
            </FigureContainer> 
            </svg>
        ) 

        expect(container.getElementsByTagName('g').item(0).getAttribute('transform')).toEqual('translate(50,10)')
    });

})


