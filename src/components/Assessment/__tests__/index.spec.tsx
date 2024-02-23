import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as Redux from 'react-redux';
import Assessment from '..';

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

jest.mock('react-redux', () => {
    return {
        useDispatch: jest.fn(),
        useSelector: jest.fn()
    };
});

describe('Assessment', () => {
    beforeEach(() => {
        mockedNavigationDispatch.mockClear();
    });

    it('verify snapshot', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: null
                }
            ],
            selectedQuestionIndex: 0
        });
        const AssessmentScreen = render(<Assessment />);
        const AssessmentScreenJson = AssessmentScreen.toJSON();
        expect(AssessmentScreenJson).toMatchSnapshot();
    });

    it('check next icon', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: null
                },
                {
                    questions: 'What is you age?',
                    options: [
                        { id: 1, value: '20', score: 3 },
                        { id: 2, value: '40', score: 2 },
                        { id: 3, value: '60', score: 1 },
                    ],
                    selectedOption: null
                }
            ],
            selectedQuestionIndex: 0
        });
        const { getByText } = render(<Assessment />);
        expect(getByText('Next >')).toBeTruthy();
    });

    it('check prev and submit icon', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: null
                },
                {
                    questions: 'What is you age?',
                    options: [
                        { id: 1, value: '20', score: 3 },
                        { id: 2, value: '40', score: 2 },
                        { id: 3, value: '60', score: 1 },
                    ],
                    selectedOption: null
                }
            ],
            selectedQuestionIndex: 1
        });
        const { getByText } = render(<Assessment />);
        expect(getByText('< Prev')).toBeTruthy();
        expect(getByText('Submit')).toBeTruthy();
    });

    it('check risk profile score calculation', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: { id: 3, value: 'Very Good', score: 3 }
                },
                {
                    questions: 'What is you age?',
                    options: [
                        { id: 1, value: '20', score: 3 },
                        { id: 2, value: '40', score: 2 },
                        { id: 3, value: '60', score: 1 },
                    ],
                    selectedOption: { id: 3, value: '60', score: 1 }
                }
            ],
            selectedQuestionIndex: 1
        });
        let calculatedScore: any = 0;
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => jest.fn((x) => {
            calculatedScore = x.payload
            return x
        }));
        const { getByText } = render(<Assessment />);
        fireEvent.press(getByText('Submit'));
        expect(mockedNavigationDispatch).toHaveBeenCalled();
        expect(calculatedScore).toEqual(66);
    });
})