import { render } from '@testing-library/react-native';
import React from 'react';
import RadioButton from '../RadioButton';

const onPressFunc = jest.fn();

describe('RadioButton', () => {

    it('should not render radio button when props not passed', () => {
        const RadioButtonComponent: any = render(<RadioButton />);
        expect(RadioButtonComponent?.root).toBeFalsy();
    })

    it('should render radio button without colored inner circle when not selected', () => {
        const RadioButtonComponent: any = render(<RadioButton text='Hi' onPress={onPressFunc} />);
        const textComp = RadioButtonComponent.getByText(`Hi`);
        const selectedIcon = RadioButtonComponent.getByTestId(`SELECTED_ICON`)
        expect(textComp).toBeTruthy();
        expect(selectedIcon?.children?.length).toEqual(0)
    })

    it('should renders radio button with colored inner circle when selected', () => {
        const RadioButtonComponent: any = render(<RadioButton text='Hi' onPress={onPressFunc} selected />);
        const textComp = RadioButtonComponent.getByText(`Hi`);
        const selectedIcon = RadioButtonComponent.getByTestId(`SELECTED_ICON`)
        expect(textComp).toBeTruthy();
        expect(selectedIcon?.children?.length).toEqual(1)
    })
})