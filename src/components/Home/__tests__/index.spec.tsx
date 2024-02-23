import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Home from '..';

let mockedNavigationDispatch = jest.fn();

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

describe('Home', () => {
    beforeEach(() => {
        mockedNavigationDispatch.mockClear();
    });

    it('should create new snapshot and check whether it match with the previous snapshot', () => {
        const HomeScreen = render(<Home />);
        const HomeScreenJson = HomeScreen.toJSON();
        expect(HomeScreenJson).toMatchSnapshot();
    });

    it('should render introduction text', () => {
        const HomeScreen = render(<Home />);
        const introText = HomeScreen.getByTestId('INTRO_TEXT')
        expect(introText).toBeTruthy()
    });


    it('should render Start button', () => {
        const HomeScreen = render(<Home />);
        const startButton = HomeScreen.getByTestId('START_BUTTON')
        expect(startButton).toBeTruthy()
    });

    it('should navigate when Start button is pressed', () => {
        const HomeScreen = render(<Home />);
        const startButton = HomeScreen.getByTestId('START_BUTTON')
        fireEvent.press(startButton);
        expect(mockedNavigationDispatch).toHaveBeenCalled();
    });
})