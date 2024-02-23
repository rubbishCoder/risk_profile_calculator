import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as Redux from 'react-redux';
import Results from '..';
import Colors from '../../../common/Colors';

let mockedNavigationDispatch = jest.fn();
let mockedStoreDispatch: any = jest.fn(() => null);

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            dispatch: mockedNavigationDispatch
        }),
        StackActions: {
            replace: jest.fn().mockImplementation(x => ({ ...x, "type": "Navigation/REPLACE" }))
        }
    };
});

jest.mock('react-redux', () => {
    return {
        useDispatch: jest.fn(),
        useSelector: jest.fn()
    };
});

describe('Results', () => {
    beforeEach(() => {
        mockedNavigationDispatch.mockClear();
    });

    it('verify snapshot', () => {
        const ResultsScreen = render(<Results />);
        const ResultsScreenJson = ResultsScreen.toJSON();
        expect(ResultsScreenJson).toMatchSnapshot();
    });


    it(`renders 'very good message' if 100%`, () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue(100);
        const ResultsScreen: any = render(<Results />);
        const messageComponent = ResultsScreen.getByText(`Congrats, your 'Risk profile score' is very good.`)
        expect(messageComponent).toBeTruthy();
        expect(ResultsScreen.root.props.style.backgroundColor).toEqual(Colors.green)
    })

    it(`renders 'good message' if 80% to 99%`, () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue(85);
        const ResultsScreen = render(<Results />);
        const messageComponent = ResultsScreen.getByText(`Congrats, your 'Risk profile score' is good.`)
        expect(messageComponent).toBeTruthy();
        expect(ResultsScreen.root.props.style.backgroundColor).toEqual(Colors.green)
    })

    it(`renders 'not good message' if 51% to 79%`, () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue(55);
        const ResultsScreen = render(<Results />);
        const messageComponent = ResultsScreen.getByText(`Your 'Risk profile score' is not that good, need to improve.`)
        expect(messageComponent).toBeTruthy();
        expect(ResultsScreen.root.props.style.backgroundColor).toEqual(Colors.yellow)
    })

    it(`renders 'very poor' message if 100%`, () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue(35);
        const ResultsScreen = render(<Results />);
        const messageComponent = ResultsScreen.getByText(`Your 'Risk profile score' is very poor, need to work more on improving the score.`)
        expect(messageComponent).toBeTruthy();
        expect(ResultsScreen.root.props.style.backgroundColor).toEqual(Colors.red)
    })

    it(`navigate on re-evaluate`, () => {
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => mockedStoreDispatch);
        const ResultsScreen = render(<Results />);
        const reEvaluateComponent = ResultsScreen.getByText(`Re-Evaluate`)
        expect(reEvaluateComponent).toBeTruthy();
        fireEvent.press(reEvaluateComponent);
        expect(mockedNavigationDispatch).toHaveBeenCalled();
    })
})