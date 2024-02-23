import { StyleSheet } from 'react-native';
import Colors from '../../common/Colors';
import RV from '../../common/utils/RV';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.white,
        fontSize: RV(24),
        textAlign: 'center',
        padding: RV(16),
        fontWeight: 'bold'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black3,
        paddingVertical: RV(16),
        paddingHorizontal: RV(20),
        borderRadius: RV(12)
    },
    buttonText: {
        fontSize: RV(24),
        textAlign: 'center',
        color: Colors.white,
        fontWeight: 'bold'
    },
});

export default styles
