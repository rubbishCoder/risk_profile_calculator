import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../Colors';
import RV from '../utils/RV';

const RadioButton = ({ text = null, onPress = null, selected = false }: any) => {

    return (
        <>
            {text && onPress &&
                <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={1}>
                    <View testID={'SELECTED_ICON'} style={{
                        ...styles.radioButtonOuter,
                        borderColor: selected ? Colors.black : Colors.grey2
                    }}>
                        {selected && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={{
                        ...styles.option,
                        color: selected ? Colors.black : Colors.grey2
                    }}>{text}</Text>
                </TouchableOpacity>}
        </>
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
        borderWidth: 1,
        borderColor: Colors.blue2,
        // shadowColor: Colors.black3,
        // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        alignItems: 'center'
    },
    radioButtonOuter: {
        borderWidth: 1,
        borderColor: '#67686b',
        width: RV(24),
        height: RV(24),
        borderRadius: RV(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioButtonInner: {
        borderWidth: 1,
        borderColor: Colors.blue2,
        backgroundColor: Colors.blue2,
        width: RV(14),
        height: RV(14),
        borderRadius: RV(100)
    },
    option: {
        paddingHorizontal: RV(16),
        fontSize: RV(20),
        color: '#67686b',
        fontWeight: 'bold'
    }
});

export default RadioButton;
