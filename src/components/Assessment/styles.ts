import { StyleSheet } from 'react-native';
import Colors from '../../common/Colors';
import RV from '../../common/utils/RV';

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: Colors.blue2,
        width: '100%',
        borderRadius: RV(10),
        padding: RV(16),
        marginBottom: RV(16)
    },
    footerContainer: {
        padding: RV(20),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    prevButton: {
        flex: 1,
        padding: RV(16),
        marginRight: RV(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.blue2,
        borderRadius: RV(8)
    },
    nextButton: {
        flex: 1,
        padding: RV(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.blue2,
        borderRadius: RV(8),
        backgroundColor: Colors.blue2
    },
    prevButtonText: {
        fontSize: RV(16),
        textAlign: 'center',
        color: Colors.blue2,
        fontWeight: 'bold'
    },
    nextButtonText: {
        fontSize: RV(16),
        textAlign: 'center',
        color: Colors.white,
        fontWeight: 'bold'
    },
    questionCount: {
        paddingHorizontal: RV(16),
        paddingTop: RV(16),
        fontSize: RV(20),
        color: Colors.blue2,
        fontWeight: 'bold'
    },
    question: {
        fontSize: RV(20),
        color: Colors.white,
        fontWeight: 'bold',
    }
});

export default styles
