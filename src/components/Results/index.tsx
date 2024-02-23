import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../common/Colors';
import RV from '../../common/utils/RV';
import styles from './styles';
import { resetQuestionDataState } from '../../reducers/questionsData';

const Results = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const riskProfileScore = useSelector((state: any) => state.questionsData.riskProfileScore)

  const resultData = useMemo(() => {
    if (riskProfileScore >= 80 && riskProfileScore <= 100) {
      return {
        text: `Congrats, you have got great\n'Risk profile score'.`,
        color: Colors.green
      }
    }
    if (riskProfileScore > 50 && riskProfileScore < 80) {
      return {
        text: `Your 'Risk profile score' is not that great, need to improve.`,
        color: Colors.yellow
      }
    }
    if (riskProfileScore <= 50) {
      return {
        text: `Your 'Risk profile score' is very poor, need to work more on improving the score.`,
        color: Colors.red
      }
    }
  }, [riskProfileScore])

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: resultData?.color }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.whiteCircle}>
          <Text style={{ fontSize: RV(60), fontWeight: 'bold', color: resultData?.color }}>{riskProfileScore}%</Text>
        </View>
        <Text style={styles.text}>
          {resultData?.text}
        </Text>
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}
          onPress={() => {
            dispatch(resetQuestionDataState())
            navigation.dispatch(StackActions.replace('Assessment'));
          }}>
          <Text style={styles.buttonText}>Re-Evaluate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Results;
