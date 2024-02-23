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

    it('should create new snapshot and check whether it match with the previous snapshot', () => {
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
        expect(AssessmentScreen.getByText('Question 1/1'));
    });

    it('should render Next > button and move to next question when pressed', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: { id: 1, value: 'Bad', score: 1 }
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
        let selectedQuestionIndex: any;
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => jest.fn((x) => {
            selectedQuestionIndex = x.payload
            return x
        }));
        const { getByText } = render(<Assessment />);
        expect(getByText('Next >')).toBeTruthy();
        fireEvent.press(getByText('Next >'));
        expect(selectedQuestionIndex).toEqual(1);
    });

    it('should render < Prev button and move to previous question when pressed', () => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue({
            questions: [
                {
                    questions: 'How are you?',
                    options: [
                        { id: 1, value: 'Bad', score: 1 },
                        { id: 2, value: 'Good', score: 2 },
                        { id: 3, value: 'Very Good', score: 3 },
                    ],
                    selectedOption: { id: 1, value: 'Bad', score: 1 }
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
        let selectedQuestionIndex: any;
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => jest.fn((x) => {
            selectedQuestionIndex = x.payload
            return x
        }));
        const { getByText } = render(<Assessment />);
        expect(getByText('< Prev')).toBeTruthy();
        fireEvent.press(getByText('< Prev'));
        expect(selectedQuestionIndex).toEqual(0);
    });

    it('should render Submit button and calculate risk profile score when pressed', () => {
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
        expect(getByText('Submit')).toBeTruthy();
        fireEvent.press(getByText('Submit'));
        expect(mockedNavigationDispatch).toHaveBeenCalled();
        expect(calculatedScore).toEqual(66);
    });

    it('should render radio buttons as per the options array length and set the option value in the selectedOption when pressed', () => {
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
        let newPayload: any;
        jest.spyOn(Redux, 'useDispatch').mockImplementation(() => jest.fn((x: any) => {
            newPayload = x?.payload;
            return x
        }));
        const { getAllByTestId } = render(<Assessment />);
        const radioButtons = getAllByTestId('SELECTED_ICON');
        expect(radioButtons?.length).toEqual(3);
        expect(radioButtons[0]?.children?.length).toEqual(0)
        fireEvent.press(radioButtons[0]);
        expect(newPayload[0]?.selectedOption).toEqual({ id: 1, value: 'Bad', score: 1 })
    })
})