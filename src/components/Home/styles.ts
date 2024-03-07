import { StyleSheet } from 'react-native';
import Colors from '../../common/Colors';
import RV from '../../common/utils/RV';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue2,
        width: '90%',
        height: RV(300),
        borderRadius: RV(50)
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
        backgroundColor: Colors.white,
        paddingVertical: RV(16),
        paddingHorizontal: RV(20),
        borderRadius: RV(12)
    },
    buttonText: {
        fontSize: RV(24),
        textAlign: 'center',
        color: Colors.blue2,
        fontWeight: 'bold'
    },
});

export default styles
