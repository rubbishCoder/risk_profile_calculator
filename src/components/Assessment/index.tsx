import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../common/Colors';
import RadioButton from '../../common/components/RadioButton';
import RV from '../../common/utils/RV';
import { setQuestions, setRiskProfileScore, setSelectedQuestionIndex } from '../../reducers/questionsData';
import styles from './styles';

const Assessment = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const { questions, selectedQuestionIndex } = useSelector((state: any) => ({
    questions: state.questionsData.questions,
    selectedQuestionIndex: state.questionsData.selectedQuestionIndex
  }))

  const selectedQuestion = questions[selectedQuestionIndex];

  const calculateRiskProfileScore = () => {
    const totalScore = questions?.reduce((acc: any, obj: any) => acc + obj?.options?.length, 0)
    const userScore = questions?.reduce((acc: any, obj: any) => acc + obj?.selectedOption?.score, 0)

    let riskProfileScore: any = (100 * userScore) / totalScore;
    riskProfileScore = parseInt(riskProfileScore);

    dispatch(setRiskProfileScore(riskProfileScore))

    navigation.dispatch(StackActions.replace('Results'));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.red, }}>
      {selectedQuestion &&
        <>
          <Text style={styles.questionCount}>{`Question ${selectedQuestionIndex + 1}/${questions?.length}`}</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: RV(16) }}>
            <Text style={styles.question}>{selectedQuestion?.question}</Text>
            {selectedQuestion?.options?.length > 0 &&
              selectedQuestion?.options?.map((d: any) => (
                <RadioButton
                  key={d?.value + d?.id}
                  text={d?.value}
                  onPress={() => {
                    let newQuestions = questions?.map((v: any, i: any) => {
                      let newData = v;
                      if (i === selectedQuestionIndex) {
                        newData = {
                          ...v,
                          selectedOption: d
                        }
                      }
                      return newData
                    })
                    dispatch(setQuestions(newQuestions))
                  }}
                  selected={selectedQuestion?.selectedOption?.id === d?.id} />
              ))}
          </ScrollView>
          <View style={styles.footerContainer}>
            {selectedQuestionIndex > 0 &&
              <TouchableOpacity style={styles.prevButton}
                onPress={() => {
                  dispatch(setSelectedQuestionIndex(selectedQuestionIndex - 1))
                }}>
                <Text style={styles.prevButtonText}>{`< Prev`}</Text>
              </TouchableOpacity>}
            <TouchableOpacity disabled={!selectedQuestion?.selectedOption}
              style={{
                ...styles.nextButton,
                marginLeft: selectedQuestionIndex > 0 ? 16 : undefined,
                opacity: !selectedQuestion?.selectedOption ? 0.5 : 1
              }}
              onPress={() => {
                if (selectedQuestionIndex === questions?.length - 1) {
                  calculateRiskProfileScore();
                } else {
                  dispatch(setSelectedQuestionIndex(selectedQuestionIndex + 1))
                }
              }}>
              <Text style={styles.nextButtonText}>{selectedQuestionIndex === questions?.length - 1 ? `Submit` : `Next >`}</Text>
            </TouchableOpacity>
          </View>
        </>}
    </SafeAreaView>
  )
}

export default Assessment;
