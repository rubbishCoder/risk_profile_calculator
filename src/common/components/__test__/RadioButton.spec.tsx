import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as Redux from 'react-redux';
import Colors from '../../../common/Colors';
import RadioButton from '../RadioButton';

const onPressFunc = jest.fn();

describe('RadioButton', () => {
    it('renders radio button without selection', () => {
        const RadioButtonComponent: any = render(<RadioButton text='Hi' onPress={onPressFunc} />);
        const textComp = RadioButtonComponent.getByText(`Hi`);
        const selectedIcon = RadioButtonComponent.getByTestId(`SELECTED_ICON`)
        expect(textComp).toBeTruthy();
        expect(selectedIcon?.children?.length).toEqual(0)
    })

    it('renders radio button with selection', () => {
        const RadioButtonComponent: any = render(<RadioButton text='Hi' onPress={onPressFunc} selected/>);
        const textComp = RadioButtonComponent.getByText(`Hi`);
        const selectedIcon = RadioButtonComponent.getByTestId(`SELECTED_ICON`)
        expect(textComp).toBeTruthy();
        expect(selectedIcon?.children?.length).toEqual(1)
    })
})