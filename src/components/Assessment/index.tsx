import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Colors from '../../common/Colors';
import RadioButton from '../../common/components/RadioButton';
import RV from '../../common/utils/RV';
import { setQuestions, setRiskProfileScore, setSelectedQuestionIndex } from '../../reducers/questionsData';
import styles from './styles';

interface Option {
  id: number,
  value: string,
  score: number
}

interface Question {
  question: string,
  options: Array<Option>,
  selectedOption: Option
}

const Assessment = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const { questions, selectedQuestionIndex } = useSelector((state: any) => ({
    questions: state.questionsData.questions,
    selectedQuestionIndex: state.questionsData.selectedQuestionIndex
  }), shallowEqual)

  const selectedQuestion = useMemo(() => questions[selectedQuestionIndex], [questions, selectedQuestionIndex]);

  const calculateRiskProfileScore = () => {
    const totalOfHighestScores = questions?.reduce((acc1: number, obj1: Question) => {
      const maxScore: number = obj1?.options.reduce((acc2: number, obj2: Option) => acc2 > obj2.score ? acc2 : obj2.score, 0);
      return acc1 + maxScore
    }, 0);

    const userScore = questions?.reduce((acc: any, obj: any) => acc + obj?.selectedOption?.score, 0)

    let riskProfileScore: any = (100 * userScore) / totalOfHighestScores;
    riskProfileScore = parseInt(riskProfileScore);

    dispatch(setRiskProfileScore(riskProfileScore))

    navigation.dispatch(StackActions.replace('Results'));
  }

  const onOptionSelect = (d: any) => {
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
  }

  const onSubmit = () => {
    if (selectedQuestionIndex === questions?.length - 1) {
      calculateRiskProfileScore();
    } else {
      dispatch(setSelectedQuestionIndex(selectedQuestionIndex + 1))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {selectedQuestion &&
        <>
          <Text style={styles.questionCount}>{`Question ${selectedQuestionIndex + 1}/${questions?.length}`}</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: RV(16) }}>
            <View style={styles.textContainer}>
              <Text style={styles.question}>{selectedQuestion?.question}</Text>
            </View>
            {selectedQuestion?.options?.length > 0 &&
              selectedQuestion.options.map((d: Option) => (
                <RadioButton
                  key={d?.value}
                  text={d?.value}
                  onPress={() => { onOptionSelect(d) }}
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
              onPress={onSubmit}>
              <Text style={styles.nextButtonText}>{selectedQuestionIndex === questions?.length - 1 ? `Submit` : `Next >`}</Text>
            </TouchableOpacity>
          </View>
        </>}
    </SafeAreaView>
  )
}

export default Assessment;
