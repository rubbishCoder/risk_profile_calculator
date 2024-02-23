import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../Colors';
import RV from '../utils/RV';

const RadioButton = ({ text = 'test', onPress = () => { }, selected = false }: any) => {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={1}>
            <View testID={'SELECTED_ICON'} style={styles.radioButtonOuter}>
                {selected && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.option}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: RV(8),
        padding: RV(16),
        width: '100%',
        marginBottom: RV(16),
        shadowColor: Colors.black3,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        alignItems: 'center'
    },
    radioButtonOuter: {
        borderWidth: 1,
        width: RV(24),
        height: RV(24),
        borderRadius: RV(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioButtonInner: {
        borderWidth: 1,
        borderColor: Colors.black3,
        backgroundColor: Colors.black3,
        width: RV(14),
        height: RV(14),
        borderRadius: RV(100)
    },
    option: {
        paddingHorizontal: RV(16),
        fontSize: RV(20),
        color: Colors.black,
        fontWeight: 'bold'
    }
});

export default RadioButton;
